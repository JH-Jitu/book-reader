import { cache } from "react";

const API_URL = "https://gutendex.com/books";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchWithRetry = async (
  url,
  options = {},
  retries = 3,
  backoff = 300
) => {
  try {
    const response = await fetch(url, {
      ...options,
      timeout: 60000, // 60 second timeout
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying fetch to ${url}. Retries left: ${retries}`);
      await wait(backoff);
      return fetchWithRetry(url, options, retries - 1, backoff * 2);
    } else {
      throw error;
    }
  }
};

export const fetchBooks = cache(async (page = 1, search = "", genre = "") => {
  const params = new URLSearchParams({
    page: page.toString(),
    search,
    topic: genre,
  });

  try {
    const response = await fetchWithRetry(`${API_URL}?${params}`, {
      next: { revalidate: 3600 },
    });

    return response.json();
  } catch (error) {
    console.error("Error fetching books:", error);
    throw new Error("Failed to fetch books. Please try again later.");
  }
});

export const fetchBookById = cache(async (id) => {
  try {
    const response = await fetchWithRetry(`${API_URL}/${id}`, {
      next: { revalidate: 3600 },
    });

    return response.json();
  } catch (error) {
    console.error(`Error fetching book with id ${id}:`, error);
    throw new Error("Failed to fetch book details. Please try again later.");
  }
});
