import { getCachedData, setCachedData } from "./cache";

const API_URL = "https://gutendex.com/books";

export async function fetchBooks(page = 1, search = "", genre = "") {
  const cacheKey = `books_${page}_${search}_${genre}`;
  const cachedData = getCachedData(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  const params = new URLSearchParams({
    page: page.toString(),
    search,
    topic: genre,
  });

  try {
    const response = await fetch(`${API_URL}?${params}`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }
    const data = await response.json();
    setCachedData(cacheKey, data);
    return data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
}

export async function fetchBookById(id) {
  const cacheKey = `book_${id}`;
  const cachedData = getCachedData(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch book");
    }
    const data = await response.json();
    setCachedData(cacheKey, data);
    return data;
  } catch (error) {
    console.error(`Error fetching book with id ${id}:`, error);
    throw error;
  }
}
