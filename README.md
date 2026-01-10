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

## Contributing

Feel free to submit issues or pull requests.

## License

ISC
