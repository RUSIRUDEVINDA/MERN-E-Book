const API_BASE_URL = "http://localhost:8000/api";

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
  },
  AI: {
    GENERATE: `${API_BASE_URL}/ai/generate`,
  },
};
