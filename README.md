# 📚 MERN E-Book Creator

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![MERN Stack](https://img.shields.io/badge/Stack-MERN-success.svg)](https://mongodb.com)
[![AI Powered](https://img.shields.io/badge/AI-Mistral%20%26%20HuggingFace-purple)](https://mistral.ai)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-Blue?logo=cloudinary&logoColor=white)](https://cloudinary.com)
[![Tailwind CSS](https://img.shields.io/badge/Style-Tailwind-38b2ac)](https://tailwindcss.com)

> **A powerful, full-stack eBook creation platform utilizing Artificial Intelligence to streamline the writing process.**

---

## 🚀 Overview

**MERN E-Book Creator** is a modern web application designed to help authors plan, write, and export eBooks seamlessly. Built with the robust MERN stack (MongoDB, Express, React, Node.js), it integrates cutting-edge AI capabilities from **Mistral AI** and **Hugging Face** to assist with content generation, summarization, and keyword extraction. Image storage is securely handled by **Cloudinary**.

Whether you are starting from a blank page or need help fleshing out a chapter, this platform provides the tools to take your book from concept to finalized PDF/DOCX export.

## ✨ Key Features

*   **🤖 AI-Powered Writing Assistant**:
    *   **Book Outlining**: Generate comprehensive chapter breakdowns using Mistral AI.
    *   **Content Generation**: Draft entire chapters based on your prompts and style preferences.
    *   **Smart Tools**: Auto-summarize text, extract keywords, and classify content using Hugging Face models.
*   **📖 Project Management**: Create, edit, and organize multiple eBook projects with ease.
*   **✍️ Rich Text Editor**: A seamless writing experience with markdown support.
*   **☁️ Cloud Integration**:
    *   **Image Storage**: Seamless and secure image uploads powered by **Cloudinary**.
*   **🎨 Customization**: Upload custom cover images for your books.
*   **📂 Flexible Exports**: Download your finished work in professional **PDF** or **DOCX** formats.
*   **🔐 Secure Authentication**: Robust user profiles and authentication system using JWT.
*   **📱 Responsive Design**: Fully responsive UI built with Tailwind CSS.

## 🛠️ Technology Stack

This project leverages a modern tech stack to ensure performance, scalability, and developer experience.

| Area | Technology |
| :--- | :--- |
| **Frontend** | React, Vite, Tailwind CSS, Lucide React, Axios |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |
| **AI / ML** | Mistral AI (Generation), Hugging Face (Analysis) |
| **Authentication** | JSON Web Tokens (JWT), bcryptjs |
| **File Handling** | Multer, Cloudinary, PDFKit, DOCX |

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

*   Node.js (v14+)
*   MongoDB (Local or Atlas URI)
*   **Mistral AI / Hugging Face API Key**

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/MERN-E-Book.git
    cd MERN-E-Book
    ```

2.  **Install Backend Dependencies**
    ```bash
    cd backend
    npm install
    ```

3.  **Install Frontend Dependencies**
    ```bash
    cd ../frontend
    npm install
    ```

4.  **Environment Configuration**
    Create a `.env` file in the `backend` directory with the following variables:
    ```env
    MONGO_URI=your_mongodb_string
    JWT_SECRET=your_jwt_secret
    JWT_EXPIRES_IN=7d
    PORT=8000
    HUGGINGFACE_API_KEY=your_mistral_or_huggingface_key
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret
    ```

5.  **Start the Application**
    Open two terminal windows:
    
    *Terminal 1 (Backend):*
    ```bash
    cd backend
    npm run dev
    ```

    *Terminal 2 (Frontend):*
    ```bash
    cd frontend
    npm run dev
    ```

6.  **Access the App**
    Open your browser and navigate to `http://localhost:5173`

## 📖 API Documentation

The backend exposes several endpoints for managing books, users, and AI operations.

### 🔐 Authentication
*   `POST /api/auth/register` - Create a new user
*   `POST /api/auth/login` - Login and receive JWT
*   `GET /api/auth/profile/:id` - Get user profile

### 📚 Books
*   `POST /api/books` - Create a new book
*   `GET /api/books` - List all user's books
*   `GET /api/books/:id` - Get book details
*   `PUT /api/books/:id` - Update book content
*   `DELETE /api/books/:id` - Delete a book
*   `PUT /api/books/cover/:id` - Upload book cover

### 🧠 AI Operations
*   `POST /api/ai/book-outline` - Generate book structure (Mistral)
*   `POST /api/ai/book-content` - Generate chapter content (Mistral)
*   `POST /api/ai/summarize` - Summarize text (Hugging Face)
*   `POST /api/ai/keywords` - Extract keywords (Hugging Face)

### 📥 Export
*   `GET /api/export/:id/pdf` - Download as PDF
*   `GET /api/export/:id/docx` - Download as Word Doc

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the **ISC License**. See `package.json` for more information.

---

### 📬 Contact

Project Link: [https://github.com/your-username/MERN-E-Book](https://github.com/your-username/MERN-E-Book)
