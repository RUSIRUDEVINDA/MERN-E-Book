# 📚 MERN E-Book Creator

<div align="center">

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-success.svg?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com)
[![React](https://img.shields.io/badge/Frontend-React-61DAFB.svg?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-339933.svg?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![Tailwind CSS](https://img.shields.io/badge/Style-Tailwind-38B2AC.svg?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Cloudinary](https://img.shields.io/badge/Cloud-Cloudinary-3448C5.svg?style=for-the-badge&logo=cloudinary&logoColor=white)](https://cloudinary.com)
[![AI Powered](https://img.shields.io/badge/AI-Mistral%20%26%20HuggingFace-792ee5.svg?style=for-the-badge&logo=huggingface&logoColor=white)](https://huggingface.co)
[![JWT](https://img.shields.io/badge/Auth-JWT-000000.svg?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io)

</div>

<div align="center">
  <h3><b>A powerful, full-stack eBook creation platform utilizing Artificial Intelligence to streamline the writing process.</b></h3>
</div>

---

## 🚀 Overview

**MERN E-Book Creator** is a state-of-the-art web application designed to empower authors. By combining the flexibility of the **MERN Stack** with the intelligence of **Mistral AI** and **Hugging Face**, it offers a seamless environment for planning, writing, and publishing eBooks.

From intelligent chapter generation to secure cloud storage, every feature is built to provide a premium user experience.

## ✨ Key Features

### 🎨 Frontend Excellence
*   **React + Vite**: Blazing fast performance and component-based architecture.
*   **Tailwind CSS**: Beautiful, responsive, and modern UI design.
*   **Rich Text Editor**: Integrated markdown support for a distraction-free writing experience.
*   **State Management**: Efficient data handling for smooth user interactions.

### ⚙️ Backend Powerhouse
*   **Secure Authentication**: 
    *   **JWT (JSON Web Tokens)**: Stateless and secure user sessions.
    *   **Bcrypt.js**: Advanced **hashing** for password security.
*   **Cloud Storage**: Implemented **Cloudinary** for optimized and secure eBook cover uploads.
*   **RESTful API**: Robust structure using Express.js and Node.js.
*   **Database**: MongoDB with Mongoose for flexible schema design.

### 🧠 Advanced AI Integration
*   **Mistral AI**: Generates detailed book outlines and creative chapter content.
*   **Hugging Face**:
    *   **Summarization**: Automatically condenses long texts.
    *   **Keyword Extraction**: Identifies core themes.
    *   **Classification**: Smartly categorizes content style.

### 📂 Professional Exports
*   **PDF Generation**: High-quality portable definition files.
*   **DOCX Support**: Editable Word documents for further formatting.

## 🛠️ Detailed Technology Stack

<div align="center">

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend Framework** | ![React](https://img.shields.io/badge/-React-61DAFB?style=flat&logo=react&logoColor=white) | Core UI Library |
| **Styling** | ![Tailwind](https://img.shields.io/badge/-Tailwind-38B2AC?style=flat&logo=tailwindcss&logoColor=white) | Styling System |
| **Backend Runtime** | ![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat&logo=nodedotjs&logoColor=white) | Server Environment |
| **API Framework** | ![Express](https://img.shields.io/badge/-Express-000000?style=flat&logo=express&logoColor=white) | Web Framework |
| **Database** | ![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?style=flat&logo=mongodb&logoColor=white) | NoSQL Database |
| **Authentication** | ![JWT](https://img.shields.io/badge/-JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white) | Secure Token Auth |
| **Security** | ![Bcrypt](https://img.shields.io/badge/-Bcrypt-555555?style=flat&logo=lock&logoColor=white) | Password Hashing |
| **Cloud Storage** | ![Cloudinary](https://img.shields.io/badge/-Cloudinary-3448C5?style=flat&logo=cloudinary&logoColor=white) | Image Management |
| **AI Models** | ![HuggingFace](https://img.shields.io/badge/-HuggingFace-FFD21E?style=flat&logo=huggingface&logoColor=black) | NLP & Text Analysis |

</div>

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

*   Node.js (v14+)
*   MongoDB (Local or Atlas URI)
*   Mistral AI & Hugging Face Keys

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/MERN-E-Book.git
    cd MERN-E-Book
    ```

2.  **Install Dependencies**
    ```bash
    # Install Backend
    cd backend
    npm install

    # Install Frontend
    cd ../frontend
    npm install
    ```

3.  **Environment Configuration**
    Create a `.env` file in the `backend` directory:
    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    JWT_EXPIRES_IN=7d
    PORT=8000
    HUGGINGFACE_API_KEY=your_key
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_key
    CLOUDINARY_API_SECRET=your_secret
    ```

4.  **Run Application**
    ```bash
    # Terminal 1: Backend
    cd backend
    npm run dev

    # Terminal 2: Frontend
    cd frontend
    npm run dev
    ```

---

### 📬 Contact

Project Link: [https://github.com/your-username/MERN-E-Book](https://github.com/your-username/MERN-E-Book)
