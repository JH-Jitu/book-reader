import { fetchBooks } from "@/lib/api";
import BookList from "@/components/BookList";
import ErrorBoundary from "@/components/ErrorBoundary";

export const metadata = {
  title: "Book Catalog | My Book App",
  description: "Browse our extensive catalog of books",
};

export default async function Home({ searchParams }) {
  const page = Number(searchParams.page) || 1;
  const search = searchParams.search || "";
  const genre = searchParams.genre || "all";

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Book Catalog</h1>
      <ErrorBoundary
        fallback={<p>Error loading books. Please try again later.</p>}
      >
        <BookList page={page} search={search} genre={genre} />
      </ErrorBoundary>
    </main>
  );
}
