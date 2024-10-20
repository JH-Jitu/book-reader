import axios from "axios";

const API_URL = "https://gutendex.com/books";

export async function fetchBooks(page = 1, search = "", genre = "") {
  const params = new URLSearchParams({
    page: page.toString(),
    search,
    topic: genre,
  });

  const response = await axios.get(`${API_URL}?${params}`);
  if (!response?.data) {
    throw new Error("Failed to fetch books");
  }

  return response?.data;
}

export async function fetchBookById(id) {
  const response = await axios.get(`${API_URL}/${id}`);
  if (!response?.data) {
    throw new Error("Failed to fetch book");
  }

  return response?.data;
}
