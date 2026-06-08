<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=40&duration=3000&pause=1000&color=FACC15&center=true&vCenter=true&multiline=true&repeat=true&width=800&height=100&lines=%F0%9F%8E%AC+CineBook+%E2%80%94+Premium+Cinema+Platform" alt="CineBook Banner" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Font_Awesome-7-528DD7?style=for-the-badge&logo=fontawesome&logoColor=white" alt="Font Awesome" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Active-brightgreen?style=flat-square" alt="Status" />
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=flat-square" alt="License" />
  <img src="https://img.shields.io/badge/PRs-Welcome-blue?style=flat-square" alt="PRs Welcome" />
  <img src="https://img.shields.io/github/stars/YOUR_USERNAME/cinebook?style=flat-square&color=gold" alt="Stars" />
  <img src="https://img.shields.io/github/forks/YOUR_USERNAME/cinebook?style=flat-square&color=teal" alt="Forks" />
</p>

<p align="center">
  <b>🎥 A next-gen, cinematic movie ticket booking web app built with Next.js 16, React 19 & premium UI/UX — featuring CRUD operations, session-based storage, and OTT-style 3D carousel.</b>
</p>

---

## 📽️ Project Demo Video

<p align="center">
  <a href="YOUR_GOOGLE_DRIVE_VIDEO_LINK_HERE">
    <img src="https://img.shields.io/badge/%E2%96%B6%EF%B8%8F_Watch_Full_Demo-Google_Drive-4285F4?style=for-the-badge&logo=googledrive&logoColor=white&labelColor=0F172A" alt="Watch Demo Video" />
  </a>
</p>

> **👆 Click the button above to watch the full project walkthrough on Google Drive!**
>
> _Replace `YOUR_GOOGLE_DRIVE_VIDEO_LINK_HERE` with your actual shareable Drive link._

---

## ✨ Key Highlights

| Feature | Description |
|---|---|
| 🎞️ **OTT-Style 3D Hero Carousel** | Netflix/Hotstar inspired cinematic slider with crossfade backdrops, auto-play & interactive 3D poster stack |
| 🎫 **Complete Ticket Booking System** | End-to-end booking flow with form validation, seat selection & confirmation |
| 🎬 **Full CRUD for Movies** | Add, Edit, Delete & View movies with a premium admin table UI |
| 📋 **Full CRUD for Bookings** | Manage customer bookings with search, edit & delete functionality |
| 🔐 **Auth System** | Login & Register modal with session-based user management |
| 🗄️ **Session Storage Database** | Persistent data storage using browser `sessionStorage` — no backend needed! |
| 📰 **News / Blog Section** | Dynamic news page with article cards |
| 📞 **Contact Page** | Contact form with validation |
| 🎨 **Glassmorphism UI** | Premium glass-panel design with blur effects, gradients & micro-animations |
| 📱 **Fully Responsive** | Pixel-perfect on all devices — mobile, tablet & desktop |
| 🌙 **Dark Cinematic Theme** | Immersive dark theme with gold accents, inspired by premium OTT platforms |

---

## 🖥️ Screenshots

<!-- 
  📸 Add your project screenshots here!
  Replace the placeholder paths below with your actual screenshot paths or URLs.
  
  Example:
  <img src="./screenshots/home.png" width="100%" />
-->

<p align="center">
  <i>📸 Screenshots coming soon — or add yours below!</i>
</p>

<details>
<summary><b>🏠 Click to view Homepage</b></summary>
<br>

<!-- ![Homepage](./screenshots/homepage.png) -->
_Add your homepage screenshot here_

</details>

<details>
<summary><b>🎬 Click to view Movies Page</b></summary>
<br>

<!-- ![Movies](./screenshots/movies.png) -->
_Add your movies page screenshot here_

</details>

<details>
<summary><b>🎫 Click to view Ticket Booking</b></summary>
<br>

<!-- ![Ticket](./screenshots/ticket.png) -->
_Add your ticket booking screenshot here_

</details>

---

## 🏗️ Project Architecture

```
CineBook/
├── 📁 public/                    # Static assets
│   ├── three_idiots.jpg          # Movie poster
│   ├── tumbbad.png               # Movie poster
│   └── ...                       # SVG icons & favicons
│
├── 📁 src/
│   ├── 📁 app/                   # Next.js App Router
│   │   ├── layout.js             # Root layout with Navbar & Footer
│   │   ├── page.js               # 🏠 Homepage (Hero Slider, Now Showing, Stats)
│   │   ├── globals.css           # 🎨 Master stylesheet (46KB+ of premium CSS!)
│   │   │
│   │   ├── 📁 movies/            # 🎬 Movies Section
│   │   │   ├── page.js           # Movie listing + CRUD admin table
│   │   │   └── 📁 [id]/          # Dynamic movie detail page
│   │   │
│   │   ├── 📁 ticket/            # 🎫 Ticket booking page
│   │   │   └── page.js           # Booking form + seat selection
│   │   │
│   │   ├── 📁 news/              # 📰 News / Blog section
│   │   │   └── page.js           # News articles listing
│   │   │
│   │   ├── 📁 contact/           # 📞 Contact page
│   │   │   └── page.js           # Contact form with validation
│   │   │
│   │   └── 📁 pages/             # 📄 Additional pages
│   │
│   ├── 📁 components/            # 🧩 Reusable UI Components
│   │   ├── Navbar.jsx            # Navigation + Auth Modal
│   │   ├── BookingFormModal.jsx   # Booking CRUD form
│   │   ├── BookingTable.jsx      # Booking management table
│   │   ├── MovieFormModal.jsx    # Movie CRUD form
│   │   └── MovieTable.jsx        # Movie management table
│   │
│   └── 📁 data/
│       └── movieData.js          # 🗃️ Session Storage DB + CRUD functions
│
├── next.config.mjs               # Next.js configuration
├── package.json                  # Dependencies & scripts
├── postcss.config.mjs            # PostCSS config
├── tailwind.config.js            # Tailwind configuration
└── eslint.config.mjs             # ESLint configuration
```

---

## 🛠️ Tech Stack

<table>
  <thead>
    <tr>
      <th>Category</th>
      <th>Technology</th>
      <th>Purpose</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>⚡ Framework</b></td>
      <td>Next.js 16 (App Router)</td>
      <td>Server-side rendering, routing, layouts</td>
    </tr>
    <tr>
      <td><b>⚛️ UI Library</b></td>
      <td>React 19</td>
      <td>Component-based architecture with hooks</td>
    </tr>
    <tr>
      <td><b>🎨 Styling</b></td>
      <td>Bootstrap 5.3 + Tailwind CSS 4 + Custom CSS</td>
      <td>Responsive grid, utility classes, glassmorphism</td>
    </tr>
    <tr>
      <td><b>🧩 Components</b></td>
      <td>React-Bootstrap</td>
      <td>Pre-built accessible UI components</td>
    </tr>
    <tr>
      <td><b>🎯 Icons</b></td>
      <td>Font Awesome 7</td>
      <td>High-quality SVG icons</td>
    </tr>
    <tr>
      <td><b>🗄️ Database</b></td>
      <td>Session Storage (Browser)</td>
      <td>Client-side persistent CRUD operations</td>
    </tr>
    <tr>
      <td><b>🔤 Typography</b></td>
      <td>Geist Font (by Vercel)</td>
      <td>Modern, clean font optimized for web</td>
    </tr>
  </tbody>
</table>

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** `v18.x` or higher → [Download Node.js](https://nodejs.org/)
- **npm** `v9.x+` or **yarn** / **pnpm** / **bun**
- **Git** → [Download Git](https://git-scm.com/)

### Installation

```bash
# 1️⃣ Clone the repository
git clone https://github.com/YOUR_USERNAME/cinebook.git

# 2️⃣ Navigate into the project
cd cinebook

# 3️⃣ Install dependencies
npm install

# 4️⃣ Start the development server
npm run dev
```

Now open **[http://localhost:3000](http://localhost:3000)** in your browser 🎬

### Build for Production

```bash
# Create optimized production build
npm run build

# Start the production server
npm start
```

---

## 🎮 Features Deep Dive

### 🎞️ Cinematic 3D Hero Carousel
- Auto-rotating OTT-style hero section with **crossfade backdrop** images
- **3D stacked poster** navigation (active, next, previous states)
- Movie info overlay with **rating**, **genre**, **year**, and **synopsis**
- Direct **"Book Ticket"** and **"View Details"** CTAs
- Hover-to-pause functionality

### 🎬 Movie CRUD Operations
```
✅ CREATE → Add new movies with full details (title, genre, poster, rating, trailer, etc.)
✅ READ   → Browse movies with cards, search, filter & detailed view
✅ UPDATE → Edit any movie's information through modal forms
✅ DELETE → Remove movies with confirmation
```

### 🎫 Booking Management
```
✅ CREATE → Book tickets with customer details & preferences
✅ READ   → View all bookings in a sortable data table
✅ UPDATE → Modify existing bookings
✅ DELETE → Cancel bookings
```

### 🔐 Authentication
- **Login** / **Register** modal with email & password
- Session-based user state management
- Personalized greeting in navbar

---

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--cinema-primary` | `#facc15` (Gold) | Primary accent, buttons, highlights |
| `--cinema-dark` | `#0f172a` (Deep Navy) | Backgrounds, panels |
| `--glass-bg` | `rgba(30, 41, 59, 0.7)` | Glassmorphism panels |
| `--glass-blur` | `20px` | Backdrop blur intensity |
| Font Family | `Geist Sans` | Modern typography |

---

## 🌟 Movie Database

The app comes pre-loaded with **14 Bollywood blockbusters** including:

| # | Movie | Genre | Rating | Year |
|---|-------|-------|--------|------|
| 1 | 3 Idiots | Comedy | ⭐ 8.4 | 2009 |
| 2 | Dangal | Drama | ⭐ 8.3 | 2016 |
| 3 | Drishyam | Thriller | ⭐ 8.2 | 2015 |
| 4 | Tumbbad | Sci-Fi | ⭐ 8.2 | 2018 |
| 5 | DDLJ | Romance | ⭐ 8.0 | 1995 |
| 6 | Jawan | Action | ⭐ 7.8 | 2023 |
| 7 | Pathaan | Action | ⭐ 6.5 | 2023 |
| ... | + 7 more movies | Various | ⭐ 6.4 - 8.2 | 1975-2023 |

> ℹ️ All data is stored in `sessionStorage` — refresh the tab to reset, or add your own movies via the CRUD interface!

---

## 📁 Environment Variables

No environment variables required! This project runs entirely on the client-side with `sessionStorage`. Zero backend configuration needed. 🎉

---

## 🤝 Contributing

Contributions are always welcome! Here's how:

```bash
# 1. Fork the repository
# 2. Create your feature branch
git checkout -b feature/amazing-feature

# 3. Commit your changes
git commit -m "feat: add amazing feature"

# 4. Push to the branch
git push origin feature/amazing-feature

# 5. Open a Pull Request
```

---

## 🔮 Roadmap

- [ ] 🎭 Add movie trailers inline player
- [ ] 🪑 Interactive seat map selection
- [ ] 💳 Payment gateway integration
- [ ] 🌐 Multi-language support (Hindi, English)
- [ ] 📊 Admin analytics dashboard
- [ ] 🔔 Push notification for new releases
- [ ] 🎞️ User movie reviews & ratings
- [ ] 🌙 Light/Dark theme toggle
- [ ] 📱 PWA (Progressive Web App) support

---

## 📜 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

## 🙋‍♂️ Author

Sindhav Dinesh

<p align="center">
  <img src="https://img.shields.io/badge/Built_with_❤️_by-Sindhav Dinesh-facc15?style=for-the-badge&labelColor=0f172a" alt="Author" />
</p>

<p align="center">
  <!-- 🔗 Replace the # with your actual profile URLs -->
  <a href="#">
    <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
  </a>&nbsp;
  <a href="#">
    <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
  </a>&nbsp;
  <a href="#">
    <img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" alt="Twitter" />
  </a>&nbsp;
  <a href="#">
    <img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white" alt="Instagram" />
  </a>&nbsp;
  <a href="#">
    <img src="https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=google-chrome&logoColor=white" alt="Portfolio" />
  </a>&nbsp;
  <a href="mailto:your.email@example.com">
    <img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" />
  </a>&nbsp;
  <a href="#">
    <img src="https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white" alt="YouTube" />
  </a>&nbsp;
  <a href="#">
    <img src="https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white" alt="Discord" />
  </a>
</p>

---

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=22&duration=3000&pause=1500&color=FACC15&center=true&vCenter=true&repeat=true&width=600&height=50&lines=%E2%AD%90+Star+this+repo+if+you+found+it+useful!;%F0%9F%8D%BF+Happy+Coding+%26+Enjoy+the+Show!" alt="Footer" />
</p>

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12,14,30&height=100&section=footer" width="100%" alt="Footer Wave" />
</p>
