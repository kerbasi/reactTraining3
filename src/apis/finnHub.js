import axios from "axios";

const URL = "https://finnhub.io/api/v1";
const TOKEN = "cf352eaad3i7csbc05h0cf352eaad3i7csbc05hg";

export default axios.create({
  baseURL: URL,
  params: {
    token: TOKEN,
  },
});
