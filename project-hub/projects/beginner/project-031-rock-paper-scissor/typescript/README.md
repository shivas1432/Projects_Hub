# Rock Paper Scissors Game

A modern, interactive Rock Paper Scissors game built with Next.js and styled using shadcn/ui components.

## 🎮 Features

- **Interactive Gameplay**: Classic Rock, Paper, Scissors mechanics
- **Modern UI**: Clean, responsive design using shadcn/ui components
- **Score Tracking**: Keep track of wins, losses, and draws
- **Animations**: Smooth transitions and visual feedback
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Game History**: View previous rounds and results

## 🚀 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) - React framework for production
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) - Re-usable components built with Radix UI and Tailwind CSS
- **Icons**: [Lucide React](https://lucide.dev/) - Beautiful & consistent icon toolkit
- **TypeScript**: For type safety and better developer experience

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/rock-paper-scissors.git
   cd rock-paper-scissors
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the game in action.

## 🎯 How to Play

1. Choose your move by clicking on Rock 🪨, Paper 📄, or Scissors ✂️
2. The computer will make its choice automatically
3. Results are determined by classic rules:
   - Rock beats Scissors
   - Scissors beats Paper
   - Paper beats Rock
4. Your score is tracked and displayed on the screen
5. Click "Play Again" to start a new round

## 🏗️ Project Structure

```
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   └── ...
│   ├── game-board.tsx
│   ├── score-display.tsx
│   └── choice-selector.tsx
├── lib/
│   ├── utils.ts
│   └── game-logic.ts
├── public/
├── package.json
└── README.md
```

## 🎨 shadcn/ui Components Used

- **Button**: For game choices and actions
- **Card**: For displaying game board and results
- **Badge**: For score indicators and game status
- **Alert**: For game notifications and results
- **Progress**: For visual game progression (if implemented)

## 🔧 Customization

### Adding New Features

The game is built with modularity in mind. You can easily extend it with:

- **Sound Effects**: Add audio feedback for moves and results
- **Multiplayer Mode**: Implement player vs player functionality
- **Tournament Mode**: Create bracket-style competitions
- **Themes**: Add different visual themes and color schemes
- **Statistics**: Detailed analytics and win/loss ratios

### Styling Modifications

All styling is handled through:
- **Tailwind CSS classes** for utility-first styling
- **shadcn/ui components** for consistent design system
- **CSS variables** defined in `globals.css` for theme customization

## 📱 Responsive Design

The game is fully responsive and optimized for:
- **Desktop**: Full-featured experience with hover effects
- **Tablet**: Touch-friendly interface with appropriate sizing
- **Mobile**: Compact layout optimized for smaller screens

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to a GitHub repository
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy with zero configuration

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler

### Code Quality

The project uses:
- **ESLint** for code linting
- **TypeScript** for type checking
- **Prettier** for code formatting (recommended)

---

**Happy Gaming! 🎮**