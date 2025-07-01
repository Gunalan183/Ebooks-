# Interactive eBook Store 📚

A full-stack MERN application that lets users browse, purchase, download and manage e-books.  
Built with **MongoDB • Express • React • Node.js**, Material-UI for a modern UI, Redux Toolkit for state-management and RTK Query for data-fetching.

---

## ✨ Features

### Frontend
- Responsive, mobile-first UI (Material-UI + Framer-Motion)
- Pages
  - **Home / Catalog** – Browse & filter books
  - **Book Details** – Cover, description, rating, price, preview, reviews, similar books
  - **Auth** – Login / Register with validation & social-login placeholders
  - **Profile** – Edit info, change password, order history, wishlist
  - **About / Contact / 404** pages
- Protected routes via `<PrivateRoute/>`
- Toast notifications for feedback

### Backend
- Express REST API (`/api`) with modular route files
- JWT authentication & password hashing (bcrypt)
- MongoDB Atlas connection (`MONGODB_URI`)
- Validation via **express-validator**
- File upload (Multer) ready for e-book assets

---

## 🚀 Quick Start

### 1. Clone & install
```bash
# clone
 git clone https://github.com/Gunalan183/Ebooks-.git
 cd Ebooks-

# install root tooling (optional)
 npm install --workspaces=false
```

### 2. Environment variables
Create `.env` in `backend/`:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/ebookstore
JWT_SECRET=<your_jwt_secret>
NODE_ENV=development
```
Create `.env` in `frontend/` (development):
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 3. Run locally (two terminals)
```bash
# Terminal 1 – backend
cd backend
npm install
npm run server   # nodemon server.js ➜ http://localhost:5000

# Terminal 2 – frontend
cd ../frontend
npm install
npm start        # CRA dev-server ➜ http://localhost:3000
```

Open `http://localhost:3000` in your browser and enjoy! 🥳

---

## 🛠️ Scripts
### Backend
| Script | Purpose |
| ------ | ------- |
| `npm run server` | Start dev server with nodemon |
| `npm start` | Production start |
| `npm test` | Jest tests (TBD) |

### Frontend
| Script | Purpose |
| ------ | ------- |
| `npm start` | React dev-server |
| `npm run build` | Production build to `build/` |
| `npm test` | React Testing Library (TBD) |

---

## 🌐 Deployment

### Backend → *Render*
1. Push repo to GitHub (see below)
2. Create **Web Service** on render.com ➜ connect repo
3. Build command `npm install` – Start command `node server.js`
4. Add env-vars from `.env`

### Frontend → *Vercel*
1. Import repo in Vercel
2. Root = `frontend/` (if monorepo) or default
3. Build `npm run build`, output `build`
4. Add env-var `REACT_APP_API_URL`

---

## 🤝 Contributing
Pull requests are welcome! Please open an issue first to discuss major changes.

---

## 📝 License
MIT © 2025 Gunalan
