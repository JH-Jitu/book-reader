const API_URL = "https://gutendex.com/books";

export async function fetchBooks(page = 1, search = "", genre = "") {
  const params = new URLSearchParams({
    page: page.toString(),
    search,
    topic: genre,
  });

  const response = await fetch(`${API_URL}?${params}`);
  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }

  return response.json();
}

export async function fetchBookById(id) {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch book");
  }

  return response.json();
}
