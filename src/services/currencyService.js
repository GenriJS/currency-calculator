import axios from 'axios';

const API_URL = 'https://v6.exchangerate-api.com/v6/';
const API_KEY = 'ab4f0eea85cb90c3f5a5b05a';

export async function fetchRates(baseCurrency) {
  const response = await axios.get(`${API_URL}${API_KEY}/latest/${baseCurrency}`);
  return response.data.conversion_rates;
}