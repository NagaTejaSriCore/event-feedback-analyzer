"""
AI Event Feedback Analyzer - Flask Backend
Uses Cohere API to analyze event feedback responses.
"""

import json
import re
import traceback
import cohere
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# ── Configure Cohere ─────────────────────────────────────────────────────────
COHERE_API_KEY = "JZu9CfqlEOlYGs8ADdMUGInwwjOEpGZzNjYsY7XP"  # Replace with your Cohere API key
co = cohere.ClientV2(api_key=COHERE_API_KEY)


# ── Routes ───────────────────────────────────────────────────────────────────

@app.route("/")
def index():
    """Serve the main dashboard page."""
    return render_template("index.html")


@app.route("/analyze", methods=["POST"])
def analyze():
    """
    Receive feedback text, call Cohere for deep analysis,
    and return structured JSON results to the frontend.
    """
    try:
        data = request.get_json()
        feedback_text = data.get("feedback", "").strip()

        if not feedback_text:
            return jsonify({"error": "No feedback provided."}), 400

        # Split individual entries
        entries = [e.strip() for e in re.split(r"\n{2,}|\n(?=\d+[\.\)])", feedback_text) if e.strip()]
        total_count = len(entries)

        # ── 1. Sentiment Analysis ─────────────────────────────────────────────
        sentiment_prompt = f"""
Classify each feedback entry as Positive, Negative, or Neutral.
Return ONLY a JSON array like: ["Positive", "Negative", "Neutral"]
No extra text, no markdown, no backticks.

Feedback:
{chr(10).join(f'{i+1}. {e}' for i, e in enumerate(entries))}
"""
        sentiment_response = co.chat(
            model="command-a-03-2025",
            messages=[{"role": "user", "content": sentiment_prompt}]
        )
        raw_sentiment = sentiment_response.message.content[0].text.strip()
        print("SENTIMENT RAW:", raw_sentiment)

        try:
            clean = re.search(r"\[.*?\]", raw_sentiment, re.DOTALL)
            sentiments = json.loads(clean.group()) if clean else []
        except Exception:
            sentiments = ["Neutral"] * total_count

        pos = sentiments.count("Positive")
        neg = sentiments.count("Negative")
        neu = total_count - pos - neg

        # ── 2. Deep Thematic Analysis ─────────────────────────────────────────
        analysis_prompt = f"""
Analyze these {total_count} feedback responses and return ONLY a JSON object.
No markdown, no backticks, no extra text — just the raw JSON object.

{{
  "themes": [
    {{"title": "Theme title", "description": "2-sentence explanation", "count": 0}}
  ],
  "positives": [
    {{"point": "Highlight point", "detail": "Supporting detail from feedback"}}
  ],
  "complaints": [
    {{"issue": "Issue title", "detail": "What attendees said", "severity": "High"}}
  ],
  "suggestions": [
    {{"action": "Actionable suggestion", "impact": "Expected benefit"}}
  ],
  "summary": "A 2-3 sentence executive summary of the overall feedback."
}}

Rules:
- themes: 3-5 main themes with realistic counts
- positives: 3-5 highlights
- complaints: 3-5 complaints, severity must be High, Medium, or Low
- suggestions: 4-6 concrete actionable suggestions

Feedback:
{feedback_text}
"""
        analysis_response = co.chat(
            model="command-a-03-2025",
            messages=[{"role": "user", "content": analysis_prompt}]
        )
        raw_analysis = analysis_response.message.content[0].text.strip()
        print("ANALYSIS RAW:", raw_analysis)

        # Strip markdown code fences if present
        raw_analysis = re.sub(r"^```[a-z]*\n?", "", raw_analysis).rstrip("`").strip()

        try:
            analysis = json.loads(raw_analysis)
        except json.JSONDecodeError:
            match = re.search(r"\{.*\}", raw_analysis, re.DOTALL)
            if match:
                analysis = json.loads(match.group())
            else:
                return jsonify({"error": "AI returned invalid format. Please try again."}), 500

        # ── Assemble Final Response ───────────────────────────────────────────
        result = {
            "total": total_count,
            "sentiment": {
                "positive": pos,
                "negative": neg,
                "neutral": neu
            },
            "themes":      analysis.get("themes", []),
            "positives":   analysis.get("positives", []),
            "complaints":  analysis.get("complaints", []),
            "suggestions": analysis.get("suggestions", []),
            "summary":     analysis.get("summary", "")
        }

        return jsonify(result)

    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


# ── Entry Point ───────────────────────────────────────────────────────────────

if __name__ == "__main__":
    app.run(debug=True, port=5000)