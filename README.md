# 📚 MERN E-Book Creator

> **The ultimate AI-powered platform for authoring, editing, and publishing eBooks.**  
> *Plan, write, and export your next bestseller with the power of modern AI.*

![Project Status](https://img.shields.io/badge/Status-Active-success?style=flat-square)
![License](https://img.shields.io/badge/License-ISC-blue?style=flat-square)
![Tech Stack](https://img.shields.io/badge/Stack-MERN-yellow?style=flat-square)

---

## 📖 Table of Contents

- [About The Project](#-about-the-project)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Usage Guide](#-usage-guide)
- [API Reference](#-api-reference)
- [Contact](#-contact)

---

## 🚀 About The Project

**MERN E-Book Creator** is a full-stack web application designed to streamline the book-writing process. By integrating advanced AI models from **Mistral AI** and **Hugging Face**, it helps authors overcome writer's block, generate creative outlines, and draft content effortlessly.

Built with performance and user experience in mind, the platform offers a sleek interface for managing book projects, editing chapters, and exporting final manuscripts in professional formats explicitly suitable for publishing.

---

## ✨ Key Features

- **🤖 AI-Powered Writing Assistant**  
  Generate detailed book outlines and full chapter content using **Mistral AI**.
- **🧠 Smart Content Analysis**  
  Utilize **Hugging Face** to summarize text, extract keywords, and classify content styles.
- **📝 Rich Text Editor**  
  A distraction-free, markdown-supported editor for writing and refining your chapters.
- **📄 Multi-Format Export**  
  Download your complete eBook as a **PDF** or **Word Document (DOCX)** with a single click.
- **🖼️ Cover Management**  
  Upload and manage custom cover art for your books.
- **🔐 Secure Authentication**  
  User registration and login system protected with JWT.

---

## 🛠 Tech Stack

### Frontend
- ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB) **React.js** - Component-based UI library.
- ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white) **Vite** - Next-generation frontend tooling.
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white) **Tailwind CSS** - Utility-first CSS framework.

### Backend
- ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat-square&logo=node.js&logoColor=white) **Node.js** - JavaScript runtime.
- ![Express.js](https://img.shields.io/badge/Express.js-404D59?style=flat-square) **Express.js** - Web framework for Node.js.
- ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat-square&logo=mongodb&logoColor=white) **MongoDB** - NoSQL database.

### AI & Libraries
- **Hugging Face Inference API** (Summarization, Keywords)
- **Mistral AI** (Content Generation)
- **PDFKit** & **Docx** (File Export)
- **Multer** (File Uploads)

---

## 🏁 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB** (Local or Atlas connection string)
- **Hugging Face API Key** (for AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/MERN-E-Book.git
   cd MERN-E-Book
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Environment Variables

Create a `.env` file in the `backend` directory and add the following configuration:

```env
# Server Configuration
PORT=8000
NODE_ENV=development

# Database
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/ebook-db

# Security
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d

# AI Configuration (Mistral & Hugging Face)
# Note: The codebase currently uses this key for both Mistral and HF services
HUGGINGFACE_API_KEY=your_hugging_face_or_mistral_api_key
```

### Running the App

1. **Start the Backend**
   ```bash
   # In the backend directory
   npm run dev
   ```

2. **Start the Frontend**
   ```bash
   # In the frontend directory
   npm run dev
   ```

3. **Open Access**
   Visit `http://localhost:5173` in your browser.

---

## 📡 API Reference

The backend exposes the following RESTful endpoints.

### 🔐 Authentication

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login and receive JWT |
| `GET` | `/api/auth/profile` | Get current user profile |

### 📚 Books & Content

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/books` | Get all user's books |
| `POST` | `/api/books` | Create a new book |
| `GET` | `/api/books/:id` | Get book details |
| `PUT` | `/api/books/:id` | Update book content |
| `DELETE` | `/api/books/:id` | Delete a book |
| `PUT` | `/api/books/cover/:id` | Upload book cover |

### 🧠 AI Features

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/ai/book-outline` | Generate book outline (Mistral) |
| `POST` | `/api/ai/book-content` | Generate chapter content (Mistral) |
| `POST` | `/api/ai/summarize` | Summarize text (Hugging Face) |
| `POST` | `/api/ai/keywords` | Extract keywords (Hugging Face) |

### 📤 Export

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/export/:id/pdf` | Download Book as PDF |
| `GET` | `/api/export/:id/docx` | Download Book as DOCX |

---

## 🤝 Contribution

Contributions are welcome! Please feel free to check the [issues page](#) or submit a pull request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **ISC License**.

---
