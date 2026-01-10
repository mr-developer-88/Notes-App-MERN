# NotesApp (MERN)

A fully responsive, easy-to-use **Notes App** built with the **MERN stack**:

- **Frontend:** React + Vite  
- **Styling:** TailwindCSS  
- **Backend:** Node.js + Express  
- **Database:** MongoDB  

This app lets users securely create, edit, delete, pin and search notes in a modern, fast and clean interface.

---

## Features

- ✅ **User Authentication** (signup, login, protected routes)  
- 📝 **Create Notes** with title and description  
- ✏️ **Edit / Update Notes**  
- 🗑️ **Delete Notes**  
- 📌 **Pin / Unpin Notes** to keep important notes at the top  
- 🔍 **Search Notes** by title or content  
- 📱 **Fully Responsive Design** (mobile, tablet, desktop)  
- 🎨 **Modern UI** powered by TailwindCSS  
- ⚡ **Fast Frontend** with React + Vite  
- 🚀 **Fast Backend** with Node.js + Express + MongoDB  

---

## Getting Started

Below is a **beginner-friendly, step-by-step guide** to run this project locally.

### Prerequisites

Make sure you have installed:

- **Node.js** (LTS recommended)  
- **npm** (comes with Node.js)  
- **MongoDB** (local or cloud like MongoDB Atlas)  
- A code editor like VS Code

---

## 1. Frontend Setup (React + Vite + TailwindCSS)

> If you already have the frontend created, you can skip the `npm create vite@latest` step and just follow install/config steps.

### Step 1: Create a new Vite + React app (optional, for fresh start)

```bash
npm create vite@latest notes-app
```

When prompted, choose:

- Framework: `React`
- Variant: `JavaScript` or `TypeScript` (your choice)

### Step 2: Go inside the frontend folder

```bash
cd notes-app
```

### Step 3: Install TailwindCSS for Vite

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

This will create:

- `tailwind.config.js`
- `postcss.config.js`

### Step 4: Configure `tailwind.config.js`

Open `tailwind.config.js` and update it like this:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Step 5: Add Tailwind directives in your main CSS

Open your main CSS file (usually `src/index.css` or `src/main.css`) and add:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Remove any default styles you dont need.

### Step 6: Install other frontend dependencies

From inside the frontend folder (`notes-app`), install:

```bash
npm install axios react-router-dom moment
```

- **axios**  for API calls to the backend  
- **react-router-dom**  for routing (login, register, notes pages etc.)  
- **moment**  for formatting dates (e.g., created/updated time)

### Step 7: Run the frontend

```bash
npm run dev
```

This will start the Vite dev server (usually at `http://localhost:5173`).

> **Important: `node_modules` are necessary.**  
> Make sure you run `npm install` at least once in your frontend folder so that `node_modules` is created.  
> Do **not** delete `node_modules` unless you know what youre doing. On another machine, just run `npm install` again.

---

## 2. Backend Setup (Node.js + Express + MongoDB)

Assuming your backend code is inside a folder named `backend` at the project root.

### Step 1: Go to the backend folder

From project root:

```bash
cd backend
```

### Step 2: Install backend dependencies

```bash
npm install
```

This will install all required packages defined in `package.json` (like `express`, `mongoose`, `cors`, `jsonwebtoken`, etc. depending on your project).

### Step 3: Configure environment variables (recommended)

Create a `.env` file in the `backend` folder (if your project uses environment variables) with values similar to:

```bash
MONGODB_URI=mongodb://localhost:27017/notesapp
PORT=5000
JWT_SECRET=your_secret_key_here
```

Adjust these to match your actual MongoDB connection string and secrets.

### Step 4: Run MongoDB

Make sure MongoDB is running:

- If local: start MongoDB service (via MongoDB Compass, services, or CLI).
- If using MongoDB Atlas: confirm your connection string in `.env` is correct and your IP is whitelisted.

### Step 5: Start the backend server

From inside `backend`:

```bash
npm start
```

Your backend will start (commonly on `http://localhost:5000` or another port defined in your code).

---

## 3. Running Frontend and Backend Together

1. Start **backend** first (so APIs are ready).
2. Then start **frontend**.
3. Open the frontend URL (e.g., `http://localhost:5173`) in your browser.
4. Sign up / log in and start creating notes.

---

## Commands Summary (Quick Reference)

**Frontend**

```bash
cd frontend/notes-app
npm install
npm run dev
```

> If your frontend folder name is just `notes-app` at the root, use:
>
> ```bash
> cd notes-app
> npm install
> npm run dev
> ```

**Backend**

```bash
cd backend
npm install
npm start
```

---

## Screenshot

Add a screenshot of your app (e.g. homepage or notes dashboard) to the project root and name it:

```text
NotesApp MERN.png
```

Then reference it in the README:

```markdown
![NotesApp Screenshot](NotesApp%20MERN.png)
```

---

## License

This project is licensed under the **MIT License**.  
You are free to use, modify, and distribute this project as per the terms of the MIT license.
