# AI Event Feedback Analyzer

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


http://127.0.0.1:5000


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

- Word cloud visualization
- Export report as PDF
- User authentication system
- Support for uploading CSV or Excel feedback files

---

## Author

Naga Teja Sri

After creating README

Run:

git add README.md
git commit -m "Added project README"
git push

If you want, I can also give you a very impressive GitHub README with badges, screenshots, and demo section that makes your project look like a professional AI startup project.

how in git hub or in the vs code i shpuld add a file

You can add the README.md file in two ways:
1️⃣ Using Visual Studio Code (recommended)
2️⃣ Directly on GitHub

I’ll show both.

Method 1: Add README in VS Code (Best Way)
Step 1

Open your project folder in Visual Studio Code.

Step 2

In the Explorer panel (left side):

Right-click on the project folder
→ Click New File

Step 3

Type the file name:

README.md
Step 4

Paste the README content I gave earlier.

Step 5

Save the file
Press Ctrl + S

Step 6

Push it to GitHub:

Open terminal in VS Code and run:

git add README.md
git commit -m "Added README file"
git push

Now the README will appear on your GitHub repository page.

Method 2: Add README directly in GitHub
Open your repository on GitHub.
Click Add file.
Click Create new file.
In the filename box type:
README.md
Paste the README content.
Scroll down and click Commit new file.
What happens after adding README

When someone opens your repository, GitHub automatically displays the README at the top of the page. It becomes the main project description.

✅ Recommended: Use VS Code because it keeps everything in your local project and version control.

If you want, I can also give you a much more impressive README (with badges, screenshots, and demo GIF) that will make your project look 10x more professional for the assignment evaluation.

yes

Great 👍 I’ll give you a more professional README that includes badges, features, screenshots section, and demo section. This will make your GitHub project look much more impressive to evaluators.

Create a file called README.md in Visual Studio Code and paste this:

Professional README.md
# AI Event Feedback Analyzer

![Python](https://img.shields.io/badge/Python-3.10-blue)
![Flask](https://img.shields.io/badge/Flask-Web%20Framework-green)
![AI](https://img.shields.io/badge/AI-Cohere%20API-purple)
![Status](https://img.shields.io/badge/Project-Completed-success)

## Overview

AI Event Feedback Analyzer is a web application that helps event organizers automatically analyze feedback responses from attendees using AI.

Instead of manually reading dozens of responses, the system processes the feedback and extracts useful insights such as sentiment distribution, key themes, common complaints, and suggestions for improvement.

---

## Problem Statement

After events such as workshops, seminars, or club activities, organizers collect feedback using forms with open-ended responses.

When there are many responses (80–100+), manually reviewing them becomes time-consuming and it is difficult to consistently identify patterns or insights.

This project provides an AI-powered solution that automatically analyzes feedback responses and generates meaningful insights for event organizers.

---

## Features

• AI-powered feedback analysis  
• Sentiment classification (Positive / Negative / Neutral)  
• Identification of key themes from feedback  
• Detection of common complaints  
• Suggestions for improving future events  
• Executive summary of feedback  
• Interactive sentiment chart visualization  
• Clean and user-friendly interface  

---

## Tech Stack

### Backend
- Python
- Flask

### AI Model
- Cohere API

### Frontend
- HTML
- CSS
- JavaScript

### Data Visualization
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

### 1 Clone the Repository


git clone https://github.com/NagaTejaSriCore/event-feedback-analyzer.git


### 2 Go to the Project Folder


cd event-feedback-analyzer


### 3 Install Dependencies


pip install flask
pip install cohere
pip install python-dotenv


### 4 Create Environment File

Create a `.env` file in the root folder:


COHERE_API_KEY=YOUR_API_KEY


### 5 Run the Application


python app.py


### 6 Open in Browser


http://127.0.0.1:5000


---

## Application Workflow

1. User enters feedback responses in the web interface.
2. The backend sends the feedback to the AI model.
3. The AI analyzes responses and extracts insights.
4. Sentiment analysis categorizes responses.
5. Results are displayed with charts and summaries.

---

## Screenshots

Add screenshots of your application here.

Example:


/screenshots/homepage.png
/screenshots/analysis.png


---

## Future Improvements

• Word cloud visualization  
• Export analysis report as PDF  
• Upload CSV or Excel feedback files  
• Multi-event analytics dashboard  

---

## Author

Naga Teja Sri

