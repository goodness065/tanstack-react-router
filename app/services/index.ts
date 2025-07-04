import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const queryClient = new QueryClient();

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

export { api };

export * from './endpoints/posts';