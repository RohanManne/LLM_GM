# 🏀 LLM GM – NBA Player Comparison & Roster Builder

LLM GM is an AI-powered basketball analytics app that compares NBA players using real stats and contract data, and generates intelligent team-building suggestions. It blends data science, LLM reasoning (via GPT or Claude), and salary cap analysis into a single interactive tool.

## 🔍 Features

- 📊 **Stat & Contract Comparison**
  - Compare any 2 NBA players with advanced stats and salary data.

- 🧠 **LLM-Generated Analysis**
  - Understand playing style, strengths/weaknesses, and ideal team fits.

- 💸 **Cap & Luxury Tax Evaluation**
  - Visualize cap space usage, flag luxury tax violations, and test trades.

- 🏗️ **Build-My-Team Mode (Coming Soon)**
  - Select a player or strategy and let the AI build a cap-compliant roster around them.

---

## 🛠️ Tech Stack

| Layer         | Tools                            |
|---------------|----------------------------------|
| Frontend      | React or Streamlit               |
| Backend       | Python, FastAPI                  |
| AI/LLM        | OpenAI GPT-4, Claude, or Groq    |
| Data          | Basketball Reference, Spotrac    |
| Database      | JSON/CSV, SQLite, or Firebase    |
| Deployment    | Vercel / Streamlit / Render      |

---

## 🚀 Setup Instructions

1. Clone the repo:
   ```bash
   git clone https://github.com/RohanManne/LLM_GM.git
   cd LLM_GM
   ```

2. Set up your virtual environment and install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Add your API key to a `.env` file:
   ```
   OPENAI_API_KEY=your-key-here
   ```

4. Run the app:
   ```bash
   streamlit run app.py
   # or npm run dev if using React
   ```

---

## �� Roadmap

- ✅ Core stat + salary comparison
- 🚧 Build-my-team assistant
- 🚧 Multi-agent trade simulation
- 🚧 Live salary + stat scraping
- 🚧 Voice interface (talk to your LLM coach)

---

## 📸 Screenshots

*(Add screenshots of the UI, player comparison, and LLM output here)*

---

## 🙋‍♂️ Author

**Rohan Manne**  
[LinkedIn](https://linkedin.com/in/your-profile) • [Portfolio](https://your-portfolio.com) • [Email](mailto:you@example.com)

