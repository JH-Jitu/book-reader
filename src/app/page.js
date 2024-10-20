import { fetchBooks } from "@/lib/api";
import BookList from "@/components/BookList";

export const metadata = {
  title: "Book Catalog | My Book App",
  description: "Browse our extensive catalog of books",
};

// Enable ISR with a revalidation period of 1 hour (3600 seconds)
export const revalidate = 3600;

export default async function Home({ searchParams }) {
  const page = Number(searchParams.page) || 1;
  const search = searchParams.search || "";
  const genre = searchParams.genre || "";

  try {
    const data = await fetchBooks(page, search, genre);

    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Book Catalog</h1>
        <BookList
          initialBooks={data.results}
          initialTotalPages={Math.ceil(data.count / 32)}
          initialPage={page}
          initialSearch={search}
          initialGenre={genre}
        />
      </main>
    );
  } catch (error) {
    console.error("Error fetching books:", error);
    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Book Catalog</h1>
        <p>Error loading books. Please try again later.</p>
      </main>
    );
  }
}
