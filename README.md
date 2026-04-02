# AI Event Feedback Analyzer

## Live Demo

You can access the live application here:

https://event-feedback-analyzer-lsjc.onrender.com

## Project Overview
AI Event Feedback Analyzer is a web application that helps event organizers automatically analyze feedback collected from attendees. Instead of manually reading dozens of responses, the system uses AI to extract insights, detect sentiment, and summarize key themes from feedback.

This tool helps organizers quickly understand what went well in an event and what improvements are needed for future events.

---

## Problem Statement
College clubs and organizations often collect feedback after events through forms with open-ended responses. When there are many responses, manually reviewing them becomes time-consuming and it is difficult to identify patterns or common complaints consistently.

This project builds an AI-powered solution that automatically analyzes feedback responses and generates useful insights for organizers.

---

## Features

- AI-based feedback analysis
- Sentiment classification (Positive / Negative / Neutral)
- Theme detection from feedback
- Identification of common complaints
- Suggestions for improving future events
- Executive summary of feedback
- Interactive sentiment visualization using charts
- Clean and simple web interface

---

## Tech Stack

Backend:
- Python
- Flask

AI Model:
- Cohere API

Frontend:
- HTML
- CSS
- JavaScript

Visualization:
- Chart.js

---

## Project Structure


event-feedback-analyzer
│
├── app.py
├── README.md
├── .gitignore
├── .env (not uploaded to GitHub)
│
├── templates
│ └── index.html
│
└── static
└── index.css


---

## Setup Instructions

### 1. Clone the repository


git clone https://github.com/NagaTejaSriCore/event-feedback-analyzer.git


### 2. Navigate to project folder


cd event-feedback-analyzer


### 3. Install dependencies


pip install flask
pip install cohere
pip install python-dotenv


### 4. Add your Cohere API key

Create a `.env` file in the project root:


COHERE_API_KEY=YOUR_API_KEY


### 5. Run the application


python app.py


### 6. Open in browser


https://event-feedback-analyzer-lsjc.onrender.com


---

## How It Works

1. User enters feedback responses in the web interface.
2. The backend sends the feedback text to the AI model.
3. The AI analyzes the responses and extracts:
   - Themes
   - Positive highlights
   - Complaints
   - Suggestions
4. Sentiment analysis is performed for each response.
5. Results are displayed with insights and charts.

---

## Example Use Case

An event organizer collects 100 feedback responses after a workshop.
Instead of manually reading each response, they paste the feedback into the application and instantly receive:

- Key themes discussed by attendees
- Most common complaints
- Positive highlights
- Suggestions for improvement
- Overall sentiment breakdown

---

## Future Improvements

-Word cloud visualization for better feedback insights
- Support for uploading Excel or CSV feedback files
- User authentication for organizers
- Export analysis report as PDF
---

## Author

Naga Teja Sri

