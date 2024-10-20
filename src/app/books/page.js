import { fetchBooks } from "@/lib/api";
import BookList from "@/components/BookList";

export const metadata = {
  title: "Book Catalog | My Book App",
  description: "Browse our extensive catalog of books",
};

export default async function BooksPage({ searchParams }) {
  const page = Number(searchParams.page) || 1;
  const search = searchParams.search || "";
  const genre = searchParams.genre || "";

  const data = await fetchBooks(page, search, genre);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Book Catalog</h1>
      <BookList
        initialBooks={data.results}
        initialTotalPages={Math.ceil(data.count / 32)}
      />
    </main>
  );
}
