# CDP Chatbot

A chatbot that answers "how-to" questions related to Customer Data Platforms (CDPs) such as **Segment**, **mParticle**, **Lytics**, and **Zeotap**. The chatbot leverages OpenAI's GPT-4 API for intelligent and context-aware responses.

---

## **Features**
1. **Core Functionalities**:
   - Handles "how-to" questions for each CDP.
   - Provides actionable guidance and steps based on documentation.

2. **Bonus Features**:
   - **Cross-CDP Comparisons**: Answer questions comparing features or approaches between CDPs.
   - **Advanced "How-to" Questions**: Address complex queries involving advanced configurations or integrations.

3. **ChatGPT-Like Interface**:
   - A user-friendly web interface with a modern design.

---

## **Dependencies**
The following dependencies are required for the project:

| Dependency      | Version   | Description                                    |
|------------------|-----------|------------------------------------------------|
| `express`       | ^4.21.2   | Web framework for building APIs.               |
| `axios`         | ^1.7.9    | HTTP client for API requests.                  |
| `dotenv`        | ^16.4.7   | Manages environment variables securely.        |
| `cors`          | ^2.8.5    | Enables cross-origin requests.                |
| `body-parser`   | ^1.20.3   | Parses incoming JSON request bodies.           |
| `fs` (built-in) | N/A       | Handles file operations in Node.js.           |
| `path` (built-in)| N/A      | Provides utilities for working with file paths.|
| `natural`       | ^8.0.1    | NLP library for tokenization and processing.   |
| `cheerio`       | ^1.0.0    | HTML parsing and web scraping.                 |
| `openai`        | ^4.78.1   | OpenAI SDK for GPT-4 integration.              |
| `nodemon`       | ^3.1.9    | Auto-restarts the server during development.   |

---

## **Setup Instructions**

### **1. Clone the Repository**
```bash
git clone https://github.com/your-username/cdp-chatbot.git
cd cdp-chatbot


### **2. Install Dependencies**
Run the following command to install all dependencies:

bash
Copy code
npm install

### **3. Set Up Environment Variables**
Create a .env file in the project root and add your OpenAI API key:

env
Copy code
OPENAI_API_KEY=your_actual_openai_api_key(hidden)


### **4. Ensure Documentation Files**
Place the documentation files for each CDP in the data folder:

segment-docs.txt
mparticle-docs.txt
lytics-docs.txt
zeotap-docs.txt
Ensure they are in plain text format and contain the relevant documentation.

### **5. Start the Server**
For development, use nodemon to auto-restart on file changes:

bash
Copy code
npm run dev
Alternatively, start the server directly:

bash
Copy code
npm start
### **6. Access the Chatbot**
Open your browser and navigate to:

arduino
Copy code
http://localhost:3000
Project Structure
The project follows a modular structure:

bash
Copy code
project-folder/
├── certs/                 # Optional: SSL certificates (if needed)
├── data/                  # Documentation files for CDPs
│   ├── segment-docs.txt
│   ├── mparticle-docs.txt
│   ├── lytics-docs.txt
│   └── zeotap-docs.txt
├── public/                # Frontend assets
│   ├── index.html         # Chatbot UI
│   ├── style.css          # Styling for the chatbot
│   └── script.js          # Frontend logic for message handling
├── src/                   # Backend source code
│   └── chatbot.js         # Main server logic
├── .env                   # Environment variables
├── package.json           # Project metadata and dependencies
├── README.md              # Project documentation
Testing
1. Cross-CDP Comparisons
Example Question:

"How does Segment's audience creation process compare to Lytics'?" Expected Behavior:
The chatbot highlights similarities and differences between the two platforms.
2. Advanced "How-to" Questions
Example Question:

"How do I configure real-time triggers in mParticle for user updates?" Expected Behavior:
The chatbot provides step-by-step guidance for setting up real-time triggers.
Troubleshooting
Error: "Sorry, there was an error processing your request"
Cause: API issues, network problems, or SSL errors.
Solution:
Check the API key in your .env file.
Ensure network connectivity to OpenAI's API.
If SSL issues persist, configure the httpsAgent in chatbot.js to bypass SSL validation (for development only).
Missing Files
Ensure that public/index.html and all data/*.txt files are present.
Future Enhancements
Add support for multi-language queries.
Implement caching to reduce API calls.
Enhance error messages for better user feedback.
License
This project is licensed under the ISC License.

Acknowledgments
Built using OpenAI GPT-4.
Inspired by modern conversational UIs like ChatGPT.
yaml
Copy code

---
