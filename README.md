# notfound.exe

A collection of existential mini-games and quirky digital experiences. Because sometimes you need to pet the void, adopt a rock, or question your typing speed while contemplating the meaninglessness of it all.

## 🎮 Features

- **Pet the Void** - Interactive void petting simulator with existential wisdom
- **Adopt a Rock** - Give a rock a home and a name
- **Color Memory Game** - Test your memory while the universe watches
- **Typing Test** - Measure your WPM with philosophical paragraphs
- **Lofi Study Mode** - Chill beats to exist to
- **Existential Loading** - Even loading screens question their purpose
- **Custom Cursor Judge** - Your cursor has opinions about your choices

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Component library
- **Framer Motion** - Animations
- **React Router** - Navigation
- **TanStack Query** - Data fetching

## 📁 Folder Structure

```
.
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable components
│   │   ├── ui/         # shadcn/ui components
│   │   └── CursorJudge.tsx
│   ├── pages/          # Page components
│   │   ├── Index.tsx   # Main hub
│   │   ├── Menu.tsx    # Navigation menu
│   │   ├── AboutMe.tsx
│   │   ├── AdoptRock.tsx
│   │   ├── ColorMemory.tsx
│   │   ├── ExistentialLoading.tsx
│   │   ├── LofiStudy.tsx
│   │   ├── PetTheVoid.tsx
│   │   ├── TypingTest.tsx
│   │   └── NotFound.tsx
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   ├── App.tsx         # Root component
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles & design tokens
├── index.html
├── vite.config.ts      # Vite configuration
├── tailwind.config.ts  # Tailwind configuration
└── tsconfig.json       # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd notfound-exe
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:8080`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 🤝 Contributing

Contributions are welcome! Whether it's a bug fix, new game, or existential crisis, here's how you can help:

### How to Contribute

1. **Fork the repository**
   - Click the "Fork" button at the top right of this page

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/notfound-exe.git
   cd notfound-exe
   ```

3. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make your changes**
   - Follow the existing code style
   - Use TypeScript and proper type definitions
   - Keep components small and focused
   - Use the design system tokens from `index.css`

5. **Test your changes**
   ```bash
   npm run dev
   ```

6. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add: your feature description"
   ```

7. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

8. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Describe your changes

### Code Style Guidelines

- Use functional components with hooks
- Prefer TypeScript interfaces over types
- Use semantic HTML elements
- Follow the existing component structure
- Use Tailwind CSS classes (avoid inline styles)
- Use design tokens from `index.css` for colors
- Keep animations smooth and purposeful

### Adding a New Game/Page

1. Create a new file in `src/pages/YourGame.tsx`
2. Follow the existing page structure (use CursorJudge, etc.)
3. Add your route to `src/App.tsx`
4. Add a navigation button in `src/pages/Menu.tsx`
5. Update this README with your new feature

## 📦 Deployment

This project can be deployed to any static hosting service:

### Vercel

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

### Netlify

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist/` folder via Netlify CLI or drag-and-drop

### GitHub Pages

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

### Docker

```bash
# Build
docker build -t notfound-exe .

# Run
docker run -p 8080:8080 notfound-exe
```

## 📝 License

This project is open source and available under the MIT License.

## 🎨 Design System

The project uses a custom design system with HSL color tokens defined in `src/index.css`. When adding new components:

- Use semantic color tokens (e.g., `bg-primary`, `text-foreground`)
- Avoid hardcoded colors like `text-white` or `bg-black`
- Check both light and dark modes
- Use smooth transitions defined in the design system

## 🐛 Bug Reports

Found a bug? Please open an issue with:
- Description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)

## 💡 Feature Requests

Have an idea for a new existential experience? Open an issue with:
- Clear description of the feature
- Why it fits the project's vibe
- Any implementation ideas

---

Made with existential dread and React ⚛️
