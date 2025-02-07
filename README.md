# Smart ITR Filing Assistant

## Overview
The **Smart ITR Filing Assistant** is a chatbot-based web application designed to assist users with **Indian Income Tax Return (ITR) filing**. It utilizes **AI-powered natural language processing** to guide users through the tax filing process by providing personalized assistance, recommending the correct ITR forms, and offering insights into deductions and exemptions.

This project leverages **Flask** for the backend, **Phi Agent** for AI-driven interactions, and **PineconeDB** for vector-based knowledge retrieval.

---

## Features
- **Conversational ITR guidance** with structured responses.
- **PDF knowledge base** for referencing tax documents.
- **Hybrid search capabilities** with PineconeDB and Gemini embedding.
- **Intelligent form recommendations** based on user income sources.
- **Error prevention mechanisms** to flag common tax filing mistakes.
- **Privacy-focused approach** with minimal data exposure.

---

## Technologies Used
- **Flask** - Web framework for handling API requests.
- **Phi Agent** - AI agent for managing conversations.
- **Claude** - AI model for response generation.
- **Groq** - AI model alternative for query processing.
- **TavilyTools** - Web search tools for real-time tax law references.
- **PDFKnowledgeBase & PDFReader** - Ingesting tax-related PDFs.
- **PineconeDB** - Vector database for knowledge retrieval.
- **GeminiEmbedder** - Embedding model for hybrid search.
- **Dotenv** - Environment variable management.

---

## Installation
### 1. Clone the repository
```sh
git clone https://github.com/your-repo/smart-itr-assistant.git
cd smart-itr-assistant
```

### 2. Install dependencies
Ensure you have Python installed, then run:
```sh
pip install -r requirements.txt
```

### 3. Set up environment variables
Create a `.env` file and add the following details:
```
PINECONE_API_KEY=your_pinecone_api_key
CLAUDE_API_KEY=your_claude_api_key
GEMINI_API_KEY=your_gemini_api_key
```

### 4. Run the application
```sh
python app.py
```
The application will be accessible at: `http://127.0.0.1:5000`

---

## API Endpoints
### **1. Home Route**
**GET /**
- Renders the home page.

### **2. Chat Endpoint**
**POST /chat**
- Accepts user queries and returns AI-generated responses.
- **Request Body:**
  ```json
  { "message": "How do I file ITR-1?" }
  ```
- **Response:**
  ```json
  { "response": "To file ITR-1, ensure you have Form 16 and include all salary details..." }
  ```

---

## Folder Structure
```
smart-itr-assistant/
│── documents/          # Folder for storing tax-related PDFs
│── templates/
│   ├── index.html      # Frontend UI
│── app.py              # Main Flask application
│── requirements.txt    # Dependencies
│── .env                # Environment variables
│── README.md           # Project documentation
```

---

## Future Enhancements
- Integrate **OCR for document processing**.
- Expand support for **regional tax variations**.
- Add a **dashboard for tax planning analytics**.

