# 🚀 Bimantha Perera - Software Engineering Portfolio

A modern, highly interactive, and visually striking personal portfolio website built with React and Tailwind CSS. The design focuses on glassmorphism, smooth micro-animations, and a premium dark-themed user experience.

## ✨ Features

- **Premium UI/UX:** Dark theme with frosted glass (glassmorphism) effects and ambient glows.
- **Dynamic Animations:** 
  - Custom orbital loading screen.
  - "Snake border" glowing hover effects on cards.
  - Typewriter effect for roles.
  - Count-up animations for statistics.
  - Scroll-triggered reveal animations via `IntersectionObserver`.
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop views.
- **Sections:**
  - **Hero:** Profile introduction with animated borders.
  - **About:** Personal background and focus areas.
  - **Stats:** Animated counter showcasing achievements.
  - **Education:** Timeline-based academic history.
  - **Skills:** Categorized technology stack with custom SVG icons.
  - **Projects:** Interactive project showcase.
  - **Resume & Contact:** CV download and direct contact form.

## 🛠️ Technology Stack

- **Framework:** [React](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** Custom SVG components

## 💻 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/bimanthaperera-lab/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to `http://localhost:5173` in your web browser.

## 📁 Project Structure

```text
src/
├── assets/         # Static assets like images and PDFs
├── components/     # Reusable React components 
│   ├── Hero.jsx    # Hero section with animated profile card
│   ├── About.jsx   # About section with snake-border
│   ├── Icons.jsx   # Custom UI SVG icons collection
│   └── ...         # Other sections (Skills, Projects, etc.)
├── App.jsx         # Main application assembly & scroll logic
├── index.css       # Global styles, custom animations & Tailwind
└── main.jsx        # React DOM entry point
```

## 🎨 Design System

- **Color Palette:** Deep space backgrounds (`#070b14`), accented with vibrant Sky Blue, Purple, Emerald, and Amber.
- **Effects:** Extensive use of `backdrop-blur` for frosted glass cards, layered radial gradients for ambient background lighting.
- **Animations:** CSS keyframes for complex behaviors (snake-borders, orbital spinners) and standard transition utilities for micro-interactions.

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).

---
*Built with ❤️ by Bimantha Perera*
