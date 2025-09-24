# 🎬 SPN Video.js Player

A modern **Custom Video player** built with **Video.js**, bundled with **Webpack**, and extended with:  
- Custom UI controls (Play, Pause, Next, Prev, Volume, Fullscreen)  
- Playlist support  
- Keyboard shortcuts (`videojs-hotkeys`)  
- Google IMA Ads integration (`videojs-contrib-ads` + `videojs-ima`)  

---

## 🚀 Environment & Tooling Setup

### 1️⃣ Initialize Project
```bash
mkdir webpack-player
cd webpack-player
npm init -y

2️⃣ Install Core Dependencies
npm install video.js videojs-hotkeys

3️⃣ Install Ads Plugins
npm install videojs-contrib-ads videojs-ima

4️⃣ Install Build Tools
npm install --save-dev webpack webpack-cli webpack-dev-server

5️⃣ Install Babel (for ES6+ support)
npm install --save-dev @babel/core @babel/preset-env babel-loader

6️⃣ Install CSS Handling
npm install --save-dev style-loader css-loader

7️⃣ Install HTML Plugin (for template injection)
npm install --save-dev html-webpack-plugin

📂 Project Structure
webpack-player/
│── src/
│   ├── index.html
│   ├── styles/
│   │   └── styles.css
│   └── js/
│       ├── main.js
│       ├── player.js
│       ├── controls.js
│       ├── playlist.js
│       ├── utils.js
│       └── ads.js
│── package.json
│── webpack.config.js
│── README.md

⚙️ Webpack Config

Your webpack.config.js contains:

Entry point: src/index.js

Output: public/ folder with hashed JS bundles

Loaders: Babel (.js) + CSS (.css)

Plugins: HtmlWebpackPlugin for injecting bundled scripts into index.html

Dev Server: Live reload on localhost:5500

🏃 Running the Project
Development (with hot reload)
npm start


Runs Webpack Dev Server at http://localhost:9001

Production Build
npm run build


Outputs optimized bundles into public/ directory.
