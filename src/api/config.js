import axios from "axios";
import { localServices } from "../Services/localServices";

let TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1NCIsIkhldEhhblN0cmluZyI6IjIyLzA1LzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcxNjMzNjAwMDAwMCIsIm5iZiI6MTY4NzcxMjQwMCwiZXhwIjoxNzE2NDgzNjAwfQ.argi0m1LRAePDxZ6Nb4AX25fZ9gclDCUAA5oW84-TsQ";

export const https = axios.create({
  baseURL: "https://movienew.cybersoft.edu.vn/",
  headers: {
    TokenCybersoft: TOKEN,
  },
});

https.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${localServices.get()?.accessToken}`,
  };
  return config;
});
