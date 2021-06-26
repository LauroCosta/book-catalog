import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://hn.algolia.com/api/v1/'
})