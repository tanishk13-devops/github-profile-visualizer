# GitHub Profile Visualizer

A beautiful, fully functional React application to visualize GitHub user profiles with interactive charts and statistics.

**Live Demo:** Search any GitHub username and instantly see:
- User profile card with avatar and bio
- Top repositories sorted by stars
- Programming language breakdown (pie chart)
- Repository creation timeline (bar chart)

---

## 🛠️ Tech Stack

### Frontend
- **React 18.2** - UI library for building interactive components
- **Vite 5.0** - Lightning-fast build tool and dev server
- **TailwindCSS 3.3** - Utility-first CSS framework for styling
- **Recharts 2.10** - Composable charting library for data visualization
- **Axios 1.6** - HTTP client for API requests

### Build & Dev Tools
- **PostCSS 8.4** - CSS processing (with Autoprefixer)
- **Autoprefixer 10.4** - Adds vendor prefixes to CSS
- **Vite React Plugin 4.0** - React JSX support in Vite

### API
- **GitHub REST API v3** - Fetches user data, repositories, and statistics

---

## 🚀 Getting Started

### Prerequisites
- **Node.js 18+** ([Download](https://nodejs.org/))
- **npm** (comes with Node.js)

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/tanishk13-devops/github-profile-visualizer.git
cd github-profile-visualizer
```

2. **Install dependencies:**
```bash
npm install
```

3. **Setup environment variables:**
```bash
cp .env.example .env
```

4. **(Optional) Add GitHub Token:**
   - Go to [GitHub Settings → Tokens](https://github.com/settings/tokens/new)
   - Generate a new token (no scopes needed for public repos)
   - Add it to `.env`:
   ```
   VITE_GITHUB_TOKEN=your_token_here
   ```
   - This increases API rate limit from 60 to 6000 requests/hour

### Running Locally

**Start the development server:**
```bash
npm run dev
```

The app will automatically open at **http://localhost:5173/**

(If port 5173 is in use, it will try 5174, 5175, etc.)

---

## 📦 Building for Production

```bash
npm run build
```

This creates optimized files in the `dist/` folder, ready to deploy.

**Preview production build:**
```bash
npm run preview
```

---

## 📁 Project Structure

```
github-profile-visualizer/
├── src/
│   ├── App.jsx                      # Main app component - manages state & routing
│   ├── main.jsx                     # Entry point - renders React into DOM
│   ├── index.css                    # Global styles with Tailwind directives
│   ├── api/
│   │   └── github.js                # GitHub API integration (axios)
│   └── components/
│       ├── SearchBar.jsx            # GitHub username input + search button
│       ├── ProfileCard.jsx          # User profile display (avatar, bio, stats)
│       ├── RepoList.jsx             # Top 6 repositories sorted by stars
│       ├── LanguageChart.jsx        # Pie chart - language breakdown
│       └── ContributionGraph.jsx    # Bar chart - repositories over time
├── index.html                       # Main HTML file
├── package.json                     # Project dependencies & scripts
├── vite.config.js                   # Vite configuration
├── tailwind.config.js               # TailwindCSS configuration
├── postcss.config.js                # PostCSS configuration
├── .env                             # Environment variables (local - not committed)
├── .env.example                     # Template for environment variables
├── .gitignore                       # Git ignore rules
└── dist/                            # Production build output
```

---

## ✨ Features

✅ **Search GitHub Users** - Enter any GitHub username  
✅ **Profile Card** - View avatar, name, bio, and key stats  
✅ **Top Repositories** - See most starred repos with details  
✅ **Language Analytics** - Interactive pie chart of languages used  
✅ **Activity Timeline** - Bar chart of repositories created per year  
✅ **Error Handling** - User-friendly error messages  
✅ **Responsive Design** - Works on desktop, tablet, and mobile  
✅ **Rate Limit Info** - Use GitHub token for higher limits  

---

## 🌐 Deployment Options

### **Option 1: Vercel (Recommended)**
Fastest deployment - takes 2 minutes

```bash
npm install -g vercel
vercel
```

### **Option 2: Netlify**
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

### **Option 3: GitHub Pages**
1. Update `vite.config.js` to add base path (if needed)
2. Go to repository Settings → Pages
3. Select `main` branch and `/root` folder
4. Site auto-deploys on every push

---

## 🔑 Environment Variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `VITE_GITHUB_TOKEN` | No | GitHub personal access token for higher API rate limits |

**Without token:** 60 requests/hour  
**With token:** 6000 requests/hour

---

## 📊 How It Works

1. **User searches** for a GitHub username in SearchBar
2. **App.jsx** calls `getUserStats()` from `api/github.js`
3. **GitHub API** returns user profile and repositories data
4. **Axios** handles HTTP requests with authentication
5. **Components** render data:
   - ProfileCard displays user info
   - RepoList shows top repos
   - LanguageChart calculates and displays language breakdown
   - ContributionGraph shows repository timeline
6. **TailwindCSS** styles everything with utility classes
7. **Recharts** renders interactive charts

---

## 📚 Learning Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev/)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Recharts Examples](https://recharts.org/examples)
- [GitHub API Docs](https://docs.github.com/en/rest)
- [Axios Documentation](https://axios-http.com/)

---

## 🐛 Troubleshooting

**Port already in use?**
- Vite automatically tries the next port (5174, 5175, etc.)

**GitHub API rate limit exceeded?**
- Add a GitHub token to `.env` file

**Build too large?**
- Consider code-splitting with dynamic imports
- Remove unused dependencies

---

## 📝 License

MIT License - Free to use and modify

---

## 👨‍💻 Author

Built by Tanishk Jaiswal

**Connect:**
- GitHub: [@tanishk13-devops](https://github.com/tanishk13-devops)

---

**Happy GitHub Profile Visualizing! 🎉**
