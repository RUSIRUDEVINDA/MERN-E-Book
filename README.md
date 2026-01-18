# MERN-E-Book

A Full-Stack AI-Powered eBook Creator built with the MERN stack (MongoDB, Express, React, Node.js) and styled using Tailwind CSS. This app enables users to plan, write, and export entire ebooks seamlessly with the assistance of Google Gemini AI - all within a single platform.

## Features

- User authentication and profile management
- Create, edit, and manage ebooks with chapters
- AI-assisted content generation using Google Gemini
- Upload cover images for ebooks
- Export ebooks in various formats (e.g., PDF, DOCX)
- Responsive UI with Tailwind CSS

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/MERN-E-Book.git
   cd MERN-E-Book
   ```

2. Install dependencies for both frontend and backend:

   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the `backend` directory with the following:
     ```
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     JWT_EXPIRES_IN=7d
     PORT=8000
     NODE_ENV=development
     GOOGLE_GENAI_API_KEY=your_google_genai_api_key
     ```

4. Start the development servers:

   ```bash
   # Backend (from backend directory)
   npm run dev

   # Frontend (from frontend directory, in a new terminal)
   npm run dev
   ```

5. Open your browser to `http://localhost:5173` (or the port specified by Vite).

## Usage

- Register or log in to access the dashboard.
- Create a new ebook by providing a title and author.
- Add chapters and use AI to generate content.
- Upload a cover image and export your ebook.

## API Endpoints

- **Auth**: `/api/auth` (register, login, profile management)
- **Books**: `/api/books` (CRUD operations for ebooks)

## Technologies Used

- **Frontend**: React, Vite, Tailwind CSS, React Router
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **AI**: Google Gemini API
- **Other**: Multer for file uploads, JWT for authentication

---

# MERN E-BOOK SYSTEM DESIGN & API GUIDE

## SYSTEM DESIGN OVERVIEW

This application is a full-stack web application built using the MERN stack:

- **M**ongoDB: NoSQL database for flexible data storage.
- **E**xpress.js: Web application framework for Node.js.
- **R**eact: Frontend JavaScript library for building user interfaces.
- **N**ode.js: JavaScript runtime environment.

### Architecture: Model-View-Controller (MVC)

1. **Models (Database Layer):** defined using Mongoose schemas (e.g., `User.js`, `Book.js`). They define the structure of the data.
2. **Controllers (Logic Layer):** Handle the business logic. They receive requests, process data (talking to Models), and send responses (e.g., `bookController.js`, `authController.js`).
3. **Routes (API Layer):** Map HTTP endpoints (URLs) to specific controller functions (e.g., `bookRoutes.js`).
4. **Middleware:** Intercepts requests for tasks like authentication (`authMiddleware.js`) and file uploads (`uploadMiddleware.js`).

### Key Features:

- **Authentication:** JWT (JSON Web Tokens) based auth. Users log in and receive a token. This token must be sent in the header of subsequent requests to prove identity.
- **AI Integration:** Uses Google's Gemini AI (`@google/genai`) to generate book outlines and chapter content.
- **File Export:** Generates downloadable .pdf (using `pdfkit`) and .docx (using `docx`) files on the fly.
- **File Upload:** Handles image uploads for book covers using `multer`.

---

## API ENDPOINT GUIDE

_NOTE: For all endpoints requiring authentication, you must include the token in the headers._

### AUTHENTICATION (Folder: auth)

1. **POST Register**
   - **URL:** `http://localhost:8000/api/auth/register`
   - **Method:** POST
   - **Description:** Creates a new user account.
   - **Body (JSON):**
     ```json
     {
       "name": "John Doe",
       "email": "john@example.com",
       "password": "securepassword123"
     }
     ```

2. **POST Login**
   - **URL:** `http://localhost:8000/api/auth/login`
   - **Method:** POST
   - **Description:** Authenticates a user and returns a token.
   - **Body (JSON):**
     ```json
     {
       "email": "john@example.com",
       "password": "securepassword123"
     }
     ```
   - **Response:** Copies the `token` string from the response. You will need this for all other requests.

3. **GET Get All Profiles**
   - **URL:** `http://localhost:8000/api/auth/profiles`
   - **Method:** GET
   - **Headers:** `Authorization: Bearer <your_token_here>`
   - **Description:** Lists all users in the system (Public info).

4. **GET Get Profile**
   - **URL:** `http://localhost:8000/api/auth/profile/:id`
   - **Method:** GET
   - **Headers:** `Authorization: Bearer <your_token_here>`
   - **Description:** Get details of a specific user. Replace `:id` with the User ID (e.g., from the login response).
   - **Note:** The endpoint logic actually uses `req.user.id` from the token, effectively ignoring the `:id` param in the URL for security in some implementations, but follows the route structure.

5. **PUT Update Profile**
   - **URL:** `http://localhost:8000/api/auth/profile/:id`
   - **Method:** PUT
   - **Headers:** `Authorization: Bearer <your_token_here>`
   - **Body (JSON):**
     ```json
     {
       "name": "John Updated",
       "password": "newpassword123" // Optional
     }
     ```

### AI GENERATION (Folder: Ai)

6. **POST Generate Book Outline**
   - **URL:** `http://localhost:8000/api/ai/generate-book-outline`
   - **Method:** POST
   - **Headers:** `Authorization: Bearer <your_token_here>`
   - **Body (JSON):**
     ```json
     {
       "topic": "Space Exploration",
       "style": "Sci-Fi",
       "numChapters": 5,
       "description": "A journey to Mars in 2050"
     }
     ```

7. **POST Generate Chapter Content**
   - **URL:** `http://localhost:8000/api/ai/generate-book-content`
   - **Method:** POST
   - **Headers:** `Authorization: Bearer <your_token_here>`
   - **Body (JSON):**
     ```json
     {
       "chapterTitle": "The Blast Off",
       "chapterDescription": "The crew prepares for launch.",
       "style": "Dramatic"
     }
     ```

8. **GET Export Ebook as Pdf**
   - **URL:** `http://localhost:8000/api/export/:id/pdf`
   - **Method:** GET
   - **Headers:** `Authorization: Bearer <your_token_here>`
   - **Description:** Downloads the book as a PDF file. Replace `:id` with your **Book ID**.

9. **GET Export Ebook as Docx**
   - **URL:** `http://localhost:8000/api/export/:id/docx`
   - **Method:** GET
   - **Headers:** `Authorization: Bearer <your_token_here>`
   - **Description:** Downloads the book as a Word document. Replace `:id` with your **Book ID**.

### EBOOK MANAGEMENT (Folder: ebook)

10. **POST Create New Book**
    - **URL:** `http://localhost:8000/api/books`
    - **Method:** POST
    - **Headers:** `Authorization: Bearer <your_token_here>`
    - **Body (JSON):**
      ```json
      {
        "title": "My New Book",
        "author": "John Doe",
        "subtitle": "A Guide to React",
        "chapters": [] // Optional initial chapters
      }
      ```

11. **GET Get Books**
    - **URL:** `http://localhost:8000/api/books`
    - **Method:** GET
    - **Headers:** `Authorization: Bearer <your_token_here>`
    - **Description:** Fetches all books created by the logged-in user.

12. **GET Get A Book**
    - **URL:** `http://localhost:8000/api/books/:id`
    - **Method:** GET
    - **Headers:** `Authorization: Bearer <your_token_here>`
    - **Description:** Get details of a single book. Replace `:id` with the **Book ID**.

13. **PUT Update Book**
    - **URL:** `http://localhost:8000/api/books/:id`
    - **Method:** PUT
    - **Headers:** `Authorization: Bearer <your_token_here>`
    - **Body (JSON):**
      ```json
      {
        "title": "Updated Title",
        "chapters": [{ "title": "Chapter 1", "content": "Updated content..." }]
      }
      ```

14. **DELETE Delete A Book**
    - **URL:** `http://localhost:8000/api/books/:id`
    - **Method:** DELETE
    - **Headers:** `Authorization: Bearer <your_token_here>`
    - **Description:** Permanently deletes the book.

15. **PUT Update Book Cover**
    - **URL:** `http://localhost:8000/api/books/cover/:id`
    - **Method:** PUT
    - **Headers:** `Authorization: Bearer <your_token_here>`
    - **Body:** **form-data** (Not JSON!)
      - Key: `image` (Type: File) -> Select an image file from your computer.
