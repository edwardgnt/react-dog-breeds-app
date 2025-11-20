# React Dog Breeds App 

[![CI](https://github.com/edwardgnt/react-dog-breeds-app/actions/workflows/ci.yml/badge.svg)](https://github.com/edwardgnt/react-dog-breeds-app/actions/workflows/ci.yml)
[![Deploy](https://img.shields.io/badge/Vercel-Deployed-brightgreen?logo=vercel)](https://react-dog-breeds-app.vercel.app/)
![Made with React](https://img.shields.io/badge/React-2025-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![MUI](https://img.shields.io/badge/Material%20UI-5.x-blue?logo=mui)
![Vite](https://img.shields.io/badge/Vite-Fast-purple?logo=vite)
[![Dog API](https://img.shields.io/badge/API-DogAPI-orange)](https://dogapi.dog/)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)



A small but polished React application that lets you browse dog breeds using a public API, with a clean Material UI data grid, search filtering, and a light/dark theme toggle.

Built with **React + Vite + MUI (Material UI)** and deployed on **Vercel**.

---

## 🚀 Live Demo

👉 **Live app:** https://react-dog-breeds-app.vercel.app

---

## ✨ Features

- 🔄 Fetches real dog breed data from the public [Dog API](https://dogapi.dog/api/v2/breeds)
- 📊 Displays data in a **Material UI DataGrid**
- 🔍 **Search by breed name** with instant client-side filtering
- 🌗 **Light / Dark mode toggle** using MUI theming + React Context
- 🎯 Clean separation of **pages** and **components**
- 📱 Responsive layout with full-width table and modern styling

---

## 🧱 Tech Stack

- [React](https://react.dev/) (via [Vite](https://vitejs.dev/))
- [Material UI (MUI)](https://mui.com/)
- [MUI X Data Grid](https://mui.com/x/react-data-grid/)
- [Dog API](https://dogapi.dog/) – public dog breeds API

---

## 🗂 Project Structure

```text

📁 src
├── 📁 components
│   └── 📄 DogBreedsTable.tsx        # Reusable MUI DataGrid for breed listing
├── 📁 pages
│   └── 📄 DogBreeds.tsx             # Main page: fetch, search, modal, image loading
├── 📁 utils
│   └── 📄 breedNameToUrl.ts         # Normalizes breed names for dog.ceo API
├── 📁 context
│   └── 📄 ColorModeContext.tsx      # Light/Dark theme context + toggle
├── 📁 theme
│   └── 📄 theme.ts                  # getTheme(mode) → MUI Theme configuration
├── 📄 App.tsx                       # App root component
├── 📄 main.tsx                      # Entry point: wraps app with providers + ThemeProvider
└── 📄 index.css                     # Base global styles
  
```

  ⚙️ Getting Started (Local Development)

1. Clone the repo
    git clone https://github.com/edwardgnt/react-dog-breeds-app.git
    <br />
    cd react-dog-breeds-app

2. Install dependencies
    npm install

3. Run the dev server
    npm run dev

4. Build for production
    npm run build

---

Data Fetching
    GET https://dogapi.dog/api/v2/breeds


    

