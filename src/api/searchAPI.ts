import axios from 'axios';

const API_BASE_URL = 'https://your-api-url.com'; // Replace with your API

export interface SearchResult {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating?: number;
  stock?: number;
}

export const searchProducts = async (query: string): Promise<SearchResult[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search`, {
      params: {
        q: query,
        limit: 10,
        sort: 'relevance',
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Search API error:', error);
    return [];
  }
};

export const getProductById = async (id: string): Promise<SearchResult | null> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Product API error:', error);
    return null;
  }
};

// Corrected getProductsByCategory function
export const getProductsByCategory = async (category: string): Promise<SearchResult[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`, {
      params: { category },
    });
    return response.data.results;
  } catch (error) {
    console.error('Category API error:', error);
    return [];
  }
};