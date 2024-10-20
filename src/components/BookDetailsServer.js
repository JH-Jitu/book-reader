import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const BookDetailsServer = ({ book }) => (
  <Card className="max-w-4xl mx-auto">
    <CardContent className="p-6">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <div className="relative w-full aspect-[3/4]">
            <Image
              src={book.formats["image/jpeg"] || "/placeholder.png"}
              alt={`Cover of ${book.title}`}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 33vw"
              className="rounded-lg"
            />
          </div>
        </div>
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
          <p className="text-xl mb-4">
            by {book.authors[0]?.name || "Unknown Author"}
          </p>
          <div className="space-y-2 mb-6">
            <p>
              <strong>Subjects:</strong>{" "}
              {book.subjects.join(", ") || "Not specified"}
            </p>
            <p>
              <strong>Languages:</strong>{" "}
              {book.languages.join(", ").toUpperCase() || "Not specified"}
            </p>
            <p>
              <strong>Download Count:</strong>{" "}
              {book.download_count.toLocaleString()}
            </p>
          </div>
          {book.bookshelves.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Bookshelves</h2>
              <div className="flex flex-wrap gap-2">
                {book.bookshelves.map((shelf, index) => (
                  <span
                    key={index}
                    className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-sm"
                  >
                    {shelf}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </CardContent>
  </Card>
);

export default BookDetailsServer;
