# 🎮 2048 Multiplayer Game

A beautiful, modern implementation of the classic 2048 puzzle game with multiplayer functionality, stunning visual effects, and smooth animations. Built with Next.js, React, and TypeScript.

## ✨ Features

### 🎯 Game Mechanics
- **Two-Player Mode**: Players alternate turns to reach 2048 or achieve the highest score
- **Multiple Win Conditions**:
  - **2048 Achievement**: First player to reach 2048 wins
  - **High Score Victory**: When board is full, player with highest score wins
  - **Draw**: Equal scores when board is full result in a draw
- **Smooth Tile Animations**: Tiles merge with satisfying disappear/appear animations
- **Turn-Based System**: Clear indication of whose turn it is

### 🎨 Visual Effects
- **Holographic Tiles**: Beautiful holographic effects on game tiles
- **Cosmic Particles**: Animated particle system background
- **Dragon Animation**: Mystical dragon animations for enhanced atmosphere
- **Energy Waves**: Dynamic energy wave effects
- **Floating Orbs**: Ambient floating orb animations
- **Game End Animations**: Dramatic tile-cracking effects when game ends

### 📱 Controls & Accessibility
- **Keyboard Controls**: Arrow keys for desktop play
- **Touch/Swipe Support**: Full mobile touch and swipe gestures
- **Responsive Design**: Optimized for both desktop and mobile devices

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed on your system
- npm, yarn, pnpm, or bun package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd 2048_game
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to start playing!

## 🎮 How to Play

### Basic Rules
1. **Objective**: Combine tiles with the same numbers to reach 2048 or achieve the highest score
2. **Movement**: Use arrow keys (desktop) or swipe (mobile) to move tiles
3. **Merging**: When two tiles with the same number touch, they merge into one
4. **New Tiles**: A new tile (value 2) appears after each move

### Multiplayer Rules
1. **Player 1** starts the game and uses the first move
2. **Players alternate turns** after each move
3. **Scoring**: Points are awarded to the player who makes the merge
4. **Winning**:
   - First to reach **2048** wins immediately
   - If board fills up, **highest score** wins
   - **Equal scores** result in a draw

### Controls
- **Desktop**: Use arrow keys (↑ ↓ ← →) to move tiles
- **Mobile**: Swipe in any direction to move tiles
- **Restart**: Click "Play Again" button when game ends

## 🛠️ Technical Stack

### Core Technologies
- **Next.js 15.5.5**: React framework with App Router
- **React 19.1.0**: UI library with latest features
- **TypeScript 5**: Type-safe development
- **CSS Modules**: Scoped styling

### Key Dependencies
- **Lodash**: Utility functions for game logic
- **UID**: Unique identifier generation for tiles
- **React Responsive**: Responsive design utilities

### Development Tools
- **ESLint**: Code linting and formatting
- **Turbopack**: Fast bundler for development and build

## 📁 Project Structure

```
2048_game/
├── app/                    # Next.js App Router pages
├── components/             # React components
│   ├── board.tsx          # Main game board
│   ├── tile.tsx           # Individual tile component
│   ├── splash.tsx         # Game end overlay
│   ├── player.tsx         # Player information display
│   ├── score.tsx          # Score display
│   ├── swipe.tsx          # Touch/swipe handler
│   └── *-animation.tsx    # Visual effect components
├── context/               # React Context providers
│   └── game-context.tsx   # Game state management
├── reducers/              # State management
│   └── game-reducer.ts    # Game logic reducer
├── schema/                # TypeScript schemas
│   └── tile.ts           # Tile data structure
├── styles/               # CSS modules
├── hooks/                # Custom React hooks
├── constants.ts          # Game configuration
└── public/              # Static assets
```

## 🎨 Customization

### Game Configuration
Edit `constants.ts` to modify game settings:
- `tileCountPerDimension`: Board size (default: 4x4)
- `gameWinTileValue`: Winning tile value (default: 2048)
- `mergeAnimationDuration`: Animation timing
- `containerWidthMobile/Desktop`: Board dimensions

### Visual Effects
Individual animation components can be customized:
- `cosmic-particles.tsx`: Background particle effects
- `dragon-animation.tsx`: Dragon visual effects
- `energy-waves.tsx`: Energy wave animations
- `floating-orbs.tsx`: Ambient orb effects

## 🚀 Build & Deploy

### Production Build
```bash
npm run build
npm run start
```

### Deploy on Vercel
The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new):

1. Push your code to GitHub/GitLab/Bitbucket
2. Import your repository on Vercel
3. Deploy with zero configuration

### Other Deployment Options
- **Netlify**: Drag and drop the `out` folder after `npm run build`
- **AWS S3**: Upload build files to S3 bucket
- **Docker**: Create a Docker container with the built application

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎯 Future Enhancements

- [ ] Online multiplayer with WebSocket support
- [ ] Game replay system
- [ ] Custom themes and color schemes
- [ ] Sound effects and background music
- [ ] Leaderboard and statistics tracking
- [ ] AI opponent mode
- [ ] Tournament bracket system

---

**Enjoy playing! 🎮** If you encounter any issues or have suggestions, please open an issue on GitHub.
