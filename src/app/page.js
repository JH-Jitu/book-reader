import { fetchBooks } from "@/lib/api";
import BookList from "@/components/BookList";

export default async function Home({ searchParams }) {
  const page = Number(searchParams.page) || 1;
  const search = searchParams.search || "";
  const genre = searchParams.genre || "";

  const data = await fetchBooks(page, search, genre);

  return (
    <main>
      <h1 className="text-3xl font-bold text-center my-8">Book Library</h1>
      <BookList
        initialBooks={data.results}
        initialTotalPages={Math.ceil(data?.count / 32)}
      />
    </main>
  );
}
