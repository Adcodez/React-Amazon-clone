import axios from "axios";

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://us-central1-clone-21ff4.cloudfunctions.net/api"
      : "http://localhost:5001/clone-21ff4/us-central1/api",
});


export default instance;
