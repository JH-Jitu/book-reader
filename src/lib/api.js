import { cache } from "react";

const API_URL = "https://gutendex.com/books";

const fetchWithTimeout = async (url, options = {}, timeout = 5000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    if (error.name === "AbortError") {
      throw new Error("Request timed out");
    }
    throw error;
  }
};

export const fetchBooks = cache(async (page = 1, search = "", genre = "") => {
  const params = new URLSearchParams({
    page: page.toString(),
    search,
    topic: genre,
  });

  try {
    const response = await fetchWithTimeout(`${API_URL}?${params}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch books: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
});

export const fetchBookById = cache(async (id) => {
  try {
    const response = await fetchWithTimeout(`${API_URL}/${id}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch book: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error(`Error fetching book with id ${id}:`, error);
    throw error;
  }
});
