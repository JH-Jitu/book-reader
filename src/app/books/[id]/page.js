import { fetchBookById } from "@/lib/api";
import BookDetailsServer from "@/components/BookDetailsServer";
import BookDetailsClient from "@/components/BookDetailsClient";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const book = await fetchBookById(params.id);
  if (!book) return { title: "Book Not Found" };
  return {
    title: `${book.title} | Book Details`,
    description: `Details about ${book.title} by ${
      book.authors[0]?.name || "Unknown Author"
    }`,
  };
}

export default async function BookDetailsPage({ params }) {
  const book = await fetchBookById(params.id);

  if (!book) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <BookDetailsClient
        bookId={book.id}
        readOnlineLink={book.formats["text/html"]}
      />
      <div className="mt-5">
        <BookDetailsServer book={book} />
      </div>
    </main>
  );
}
