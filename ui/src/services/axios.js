import axios from "axios";

export default axios.create({
  baseURL:
    import.meta.env.VITE_ENVIRONMENT === "DEVELOPMENT"
      ? import.meta.env.VITE_LOCAL_SERVER_URL
      : import.meta.env.VITE_SERVER_URL,
});
