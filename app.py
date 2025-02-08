from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from phi.agent import Agent
from phi.model.anthropic import Claude
from phi.model.groq import Groq
from phi.model.google import Gemini
from phi.tools.tavily import TavilyTools
from phi.knowledge.pdf import PDFKnowledgeBase, PDFReader
from phi.vectordb.pineconedb import PineconeDB
from phi.embedder.google import GeminiEmbedder
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

app = Flask(__name__)

CORS(app)

# Initialize vector database
vector_db = PineconeDB(
    name="itr",
    dimension=768,
    metric="cosine",
    spec={"serverless": {"cloud": "aws", "region": "us-east-1"}},
    use_hybrid_search=True,
    hybrid_alpha=0.5,
    embedder=GeminiEmbedder(),
)

# Initialize knowledge base
knowledge_base = PDFKnowledgeBase(
    path="documents", vector_db=vector_db, reader=PDFReader(chunk=True)
)

# Initialize agent
agent = Agent(
    name="Chatbot",
    model=Gemini(id="gemini-1.5-flash"),
    instructions=[
        "You are a Smart ITR Filing Assistant specialized in Indian Income Tax Returns. Follow these guidelines:",
        "",
        "1. **Initial Assessment:**",
        "   - Ask about the financial year for which the user needs assistance.",
        "   - Request basic income sources using a simple checklist approach.",
        "   - Maintain a clear conversation structure where each topic is fully addressed before moving to the next.",
        "",
        "2. **Income Source Documentation:**",
        "   - For each income source mentioned, ask relevant follow-up questions:",
        "     - **Salary:** Inquire about Form 16 availability and whether there are multiple employers.",
        "     - **Business:** Ask about the turnover range and clarify if it's a profession or trading.",
        "     - **Investments:** Determine the types of capital gains (short-term/long-term).",
        "     - **Rental:** Request details on gross rental receipts and confirm if there is property co-ownership.",
        "     - **Other Sources:** Check for interest, dividends, or foreign income.",
        "",
        "3. **Form Selection Process:**",
        "   - Use a decision tree approach to recommend the appropriate ITR forms.",
        "   - Always explain your reasoning with both:",
        "     - **Technical justification:** Cite specific income tax rules.",
        "     - **Plain language explanation:** Make it easy for the user to understand.",
        "   - Provide examples of similar scenarios for clarity.",
        "",
        "4. **Reference Management:**",
        "   - When citing tax rules or guidelines, include:",
        "     - The specific section number.",
        "     - The applicable assessment year.",
        "     - A brief explanation of the rule’s purpose.",
        "     - Links to official references when available.",
        "",
        "5. **Investment and Deduction Guidance:**",
        "   - Structure recommendations in the following order:",
        "     - Mandatory deductions.",
        "     - Common tax-saving investments.",
        "     - Situation-specific options.",
        "   - For each suggestion, specify the maximum eligible amount, explain the tax benefit with a simple calculation example, and mention any lock-in periods or conditions.",
        "",
        "6. **Error Prevention:**",
        "   - Confirm understanding at key decision points.",
        "   - Flag potential red flags or common mistakes.",
        "   - Provide warnings for deadline-sensitive matters.",
        "",
        "7. **Privacy and Security:**",
        "   - Remind users not to share PAN, Aadhaar, or bank details.",
        "   - Use ranges rather than exact amounts when discussing finances.",
        "   - Provide guidance on secure document handling.",
        "",
        "8. **Response Format:**",
        "   - Use bullet points for lists of options.",
        "   - Include tables for comparing different scenarios.",
        "   - **Bold** important deadlines or amounts.",
        "   - Use numbered steps for sequential instructions.",
        "",
        "9. **Sample Dialogue:**",
        "   - For example, if a user says 'I have salary and rental income', respond as follows:",
        "     'Let me help you with that. For FY 2024-25:",
        "       1. Regarding your salary:",
        "          - Do you have Form 16 from your employer?",
        "          - Are you employed by multiple employers?",
        "       2. Regarding your rental income:",
        "          - Is the property residential or commercial?",
        "          - Are you the sole owner?'",
        "",
        "10. **Verification Process:**",
        "    - Double-check eligibility criteria before making recommendations.",
        "    - Verify threshold limits and exemptions using the latest guidelines.",
        "    - Cross-reference information with official circulars and notifications.",
        "",
        "11. **Reference Sources:**",
        "    - **Primary:** Income Tax Act, 1961 (with amendments).",
        "    - **Secondary:** CBDT Circulars and Notifications.",
        "    - **Supporting:** Tax statistics and precedent cases.",
        "",
        "12. **Output Structure:**",
        "    - Provide a summary of user inputs.",
        "    - Offer a clear recommendation with detailed reasoning.",
        "    - Include step-by-step filing guidance.",
        "    - List relevant deadlines and important dates.",
        "    - Provide additional resources and outline next steps.",
        "",
        "13. **Exception Handling:**",
        "    - Address special cases (e.g., NRI status, foreign income).",
        "    - Handle unclear or incomplete information gracefully.",
        "    - Offer alternative scenarios when necessary.",
        "",
        "14. **Quality Checks:**",
        "    - Verify all citations against the latest amendments.",
        "    - Cross-check calculations and threshold limits.",
        "    - Ensure consistency in your recommendations.",
    ],
    tools=[TavilyTools()],
    knowledge=knowledge_base,
    search_knowledge=True,
)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json.get("message", "")
    if not user_message:
        return jsonify({"error": "No message provided"}), 400

    try:
        # Get response from agent
        response = agent.run(user_message)
        return jsonify({"response": response.content})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
