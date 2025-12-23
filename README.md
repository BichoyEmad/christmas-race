# 🎅 Christmas Race: The Ultimate Holiday Quiz Challenge 🏎️

![Christmas Race Banner](https://img.shields.io/badge/Christmas-Race-D42426?style=for-the-badge&logo=react&logoColor=white)
![Version](https://img.shields.io/badge/version-1.0.0-2F5233?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/React_19-Vite-blue?style=for-the-badge&logo=vite)

Welcome to the **Christmas Race**! A high-fidelity, interactive 2D racing game designed for the holiday season. Pit two teams against each other in a battle of wits—where answering questions correctly is the only way to drive Santa's car to the finish line!

---

## ✨ Key Features

- **🏆 Competitive Team Racing**: Support for two teams (Red vs. Green) with customizable names.
- **📄 Dynamic Question Loading**: Upload your own question sets directly via Excel files (`.xlsx`, `.xls`).
- **🎨 High-Fidelity 2D Visuals**: Beautifully crafted tracks, Santas, and cars with smooth parallax effects.
- **❄️ Immersive Atmosphere**: Dynamic snow effects and festive UI elements that bring the holiday spirit to life.
- **🧠 Interactive Quiz Engine**:
  - Fuzzy matching for answers (options or direct text).
  - Reveal correct answer feature.
  - Real-time feedback and progress tracking.
- **🎊 Epic Victory Celebration**: Animated confetti and victory panels when a team crosses the finish line.

---

## 🚀 Tech Stack

- **Framework**: [React 19](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Data Handling**: [XLSX](https://sheetjs.com/) for Excel parsing
- **Icons**: [Lucide React](https://lucide.dev/)
- **Effects**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Styling**: Vanilla CSS with modern Glassmorphism effects

---

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-repo/christmas-race.git
   cd christmas-race
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 📊 Excel Format Guide

To make the game yours, create two Excel files (one for each team) with the following columns:

| Question | Option A | Option B | Option C | Correct Answer |
| :--- | :--- | :--- | :--- | :--- |
| What color is Santa's suit? | Blue | Red | Green | Red |
| Where does Santa live? | South Pole | North Pole | New York | North Pole |

> [!TIP]
> The parser is flexible! It looks for any header containing "Question" or "Pregunta" and "Answer" or "Correct". All other non-empty columns in the row will be treated as multiple-choice options.

---

## 🎮 How to Play

1. **Setup**: Enter team names and upload your question files.
2. **Turn-based Action**: Click the **🎲 Open Question** button when it's your team's turn.
3. **Answer**: Select the correct option. A correct answer moves your car forward!
4. **Win**: The first team to reach the end of the track wins the grand prize!

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

**Happy Holidays and Happy Racing!** 🎄🎁
