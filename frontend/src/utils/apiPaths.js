const API_BASE_URL = "https://mern-e-book-backend.onrender.com/api";
export const BASE_URL = "https://mern-e-book-backend.onrender.com";

export const API_PATHS = {
  AUTH: {
    REGISTER: `${API_BASE_URL}/auth/register`,
    LOGIN: `${API_BASE_URL}/auth/login`,
    GET_PROFILE: `${API_BASE_URL}/auth/profile/:id`,
    UPDATE_PROFILE: `${API_BASE_URL}/auth/profile/:id`,
    GET_ALL_PROFILES: `${API_BASE_URL}/auth/profiles`,
  },
  BOOKS: {
    GET_ALL: `${API_BASE_URL}/books`,
    GET_BY_ID: `${API_BASE_URL}/books/:id`,
    CREATE: `${API_BASE_URL}/books`,
    UPDATE: `${API_BASE_URL}/books/:id`,
    DELETE: `${API_BASE_URL}/books/:id`,
    UPLOAD_COVER: `${API_BASE_URL}/books/cover/:id`,
  },
  AI: {
    GENERATE_OUTLINE: `${API_BASE_URL}/ai/generate-book-outline`,
    GENERATE_CONTENT: `${API_BASE_URL}/ai/generate-book-content`,
  },
  EXPORT: {
    EXPORT_PDF: `${API_BASE_URL}/export/pdf/:id`,
    EXPORT_DOCX: `${API_BASE_URL}/export/docx/:id`,
  },
};
