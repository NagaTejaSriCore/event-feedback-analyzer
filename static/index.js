/**
 * FeedbackLens — Frontend Logic
 * Handles textarea counting, API calls, and rendering results.
 */

// ── Element References ──────────────────────────────────────────
const textarea    = document.getElementById("feedbackInput");
const analyzeBtn  = document.getElementById("analyzeBtn");
const clearBtn    = document.getElementById("clearBtn");
const entryCount  = document.getElementById("entryCount");
const loaderWrap  = document.getElementById("loaderWrap");
const errorBanner = document.getElementById("errorBanner");
const errorMsg    = document.getElementById("errorMsg");
const results     = document.getElementById("results");

let sentimentChartInstance = null;  // Track Chart.js instance

// ── Live Entry Counter ──────────────────────────────────────────
/**
 * Estimates the number of distinct feedback entries by splitting
 * on blank lines or numbered list patterns.
 * 
 */

function renderKeywords(text){

const words = text
.toLowerCase()
.replace(/[^\w\s]/g,"")
.split(/\s+/);

const stopWords = ["the","is","was","and","a","to","of","in","it"];

const freq = {};

words.forEach(w=>{
if(!stopWords.includes(w) && w.length>3){
freq[w] = (freq[w]||0)+1;
}
});

const sorted = Object.entries(freq)
.sort((a,b)=>b[1]-a[1])
.slice(0,8);

const list = document.getElementById("keywordList");

list.innerHTML = sorted.map(
([word,count])=>`<li>${word} (${count})</li>`
).join("");

}


function countEntries(text) {
  if (!text.trim()) return 0;
  const parts = text.split(/\n{2,}|\n(?=\d+[\.\)])/).filter(p => p.trim());
  return parts.length;
}

textarea.addEventListener("input", () => {
  const count = countEntries(textarea.value);
  entryCount.textContent = `${count} ${count === 1 ? "entry" : "entries"} detected`;
});

// ── Clear Button ────────────────────────────────────────────────
clearBtn.addEventListener("click", () => {
  textarea.value = "";
  entryCount.textContent = "0 entries detected";
  results.hidden = true;
  errorBanner.hidden = true;
});

// ── Analyze Button ──────────────────────────────────────────────
analyzeBtn.addEventListener("click", async () => {
  const feedback = textarea.value.trim();
  if (!feedback) {
    showError("Please paste some feedback responses first.");
    return;
  }

  // UI: loading state
  analyzeBtn.disabled = true;
  results.hidden = true;
  errorBanner.hidden = true;
  loaderWrap.hidden = false;

  try {
    const response = await fetch("/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ feedback })
    });

    const data = await response.json();

    if (!response.ok || data.error) {
      throw new Error(data.error || "Server error. Please try again.");
    }

    renderResults(data);
    renderKeywords(feedback);
    results.hidden = false;
    results.scrollIntoView({ behavior: "smooth", block: "start" });

  } catch (err) {
    showError(err.message);
  } finally {
    loaderWrap.hidden = true;
    analyzeBtn.disabled = false;
  }
});

// ── Error Helper ────────────────────────────────────────────────
function showError(msg) {
  errorMsg.textContent = msg;
  errorBanner.hidden = false;
  loaderWrap.hidden = true;
}

// ── Render Results ──────────────────────────────────────────────
function renderResults(data) {
  const { total, sentiment, themes, positives, complaints, suggestions, summary } = data;

  // Summary
  typeSummary(summary);

  // Stats
  setText("statTotal", total,              ".stat-num");
  setText("statPos",   sentiment.positive, ".stat-num");
  setText("statNeu",   sentiment.neutral,  ".stat-num");
  setText("statNeg",   sentiment.negative, ".stat-num");

  // Sentiment Chart
  renderSentimentChart(sentiment);

  // Themes
  renderThemes(themes);

  // Positives
  renderPositives(positives);

  // Complaints
  renderComplaints(complaints);

  // Suggestions
  renderSuggestions(suggestions);
}

// Helper: set inner text of a child selector
function setText(parentId, value, selector) {
  const el = document.querySelector(`#${parentId} ${selector}`);
  if (el) el.textContent = value;
}

// ── Sentiment Pie Chart ─────────────────────────────────────────
function renderSentimentChart(sentiment) {
  const ctx = document.getElementById("sentimentChart").getContext("2d");

  // Destroy previous instance if exists
  if (sentimentChartInstance) sentimentChartInstance.destroy();

  const labels = ["Positive", "Neutral", "Negative"];
  const values = [sentiment.positive, sentiment.neutral, sentiment.negative];
  const colors = ["#34d399", "#94a3b8", "#fb7185"];

  sentimentChartInstance = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels,
      datasets: [{
        data: values,
        backgroundColor: colors,
        borderColor: "#111827",
        borderWidth: 3,
        hoverBorderWidth: 0,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "68%",
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => ` ${ctx.label}: ${ctx.parsed} responses`
          }
        }
      }
    }
  });

  // Custom legend
  const legend = document.getElementById("chartLegend");
  legend.innerHTML = labels.map((lbl, i) => `
    <div class="legend-item">
      <span class="legend-dot" style="background:${colors[i]}"></span>
      <span>${lbl} (${values[i]})</span>
    </div>
  `).join("");
}

// ── Themes ──────────────────────────────────────────────────────
function renderThemes(themes) {
  const list = document.getElementById("themeList");
  list.innerHTML = themes.map(t => `
    <li class="theme-item">
      <div class="theme-bar-wrap">
        <div class="theme-name">${escHtml(t.title)}</div>
        <div class="theme-desc">${escHtml(t.description)}</div>
      </div>
      <span class="theme-count">${t.count}</span>
    </li>
  `).join("");
}

// ── Positives ───────────────────────────────────────────────────
function renderPositives(positives) {
  const list = document.getElementById("positiveList");
  list.innerHTML = positives.map(p => `
    <li class="insight-item">
      <div>
        <div class="insight-point">✓ ${escHtml(p.point)}</div>
        <div class="insight-detail">${escHtml(p.detail)}</div>
      </div>
    </li>
  `).join("");
}

// ── Complaints ──────────────────────────────────────────────────
function renderComplaints(complaints) {
  const list = document.getElementById("complaintList");
  list.innerHTML = complaints.map(c => {
    const sev = (c.severity || "Medium").toLowerCase();
    return `
      <li class="insight-item">
        <div>
          <div class="insight-point">
            ${escHtml(c.issue)}
            <span class="severity severity-${sev}">${escHtml(c.severity)}</span>
          </div>
          <div class="insight-detail">${escHtml(c.detail)}</div>
        </div>
      </li>
    `;
  }).join("");
}

// ── Suggestions ─────────────────────────────────────────────────
function renderSuggestions(suggestions) {
  const grid = document.getElementById("suggestionGrid");
  grid.innerHTML = suggestions.map((s, i) => `
    <div class="suggestion-item">
      <div class="suggestion-num">Suggestion ${i + 1}</div>
      <div class="suggestion-action">${escHtml(s.action)}</div>
      <div class="suggestion-impact">${escHtml(s.impact)}</div>
    </div>
  `).join("");
}

// ── Security: HTML Escape ────────────────────────────────────────
function escHtml(str) {
  const div = document.createElement("div");
  div.textContent = str ?? "";
  return div.innerHTML;
}
function typeSummary(text) {

  const el = document.getElementById("summaryBar");
  el.textContent = "";

  let i = 0;

  const interval = setInterval(() => {

    el.textContent += text[i];
    i++;

    if (i >= text.length) {
      clearInterval(interval);
    }

  }, 15);

}