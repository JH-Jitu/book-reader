"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BookCard from "./BookCard";
import SearchBar from "./SearchBar";
import GenreFilter from "./GenreFilter";
import PaginationComponent from "./Pagination";
import useLocalStorage from "../hooks/useLocalStorage";
import { fetchBooks } from "../lib/api";

const BookList = ({ initialBooks, initialTotalPages }) => {
  const [books, setBooks] = useState(initialBooks);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [isLoading, setIsLoading] = useState(false);
  const [wishlist, setWishlist] = useLocalStorage("wishlist", []);

  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";
  const genre = searchParams.get("genre") || "all";

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchBooks(
          page,
          search,
          genre === "all" ? "" : genre
        );
        setBooks(data.results);
        setTotalPages(Math.ceil(data?.count / 32)); // default page size
      } catch (error) {
        console.error("Failed to fetch books:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (page !== 1 || search !== "" || genre !== "all") {
      fetchData();
    } else {
      setBooks(initialBooks);
      setTotalPages(initialTotalPages);
    }
  }, [page, search, genre, initialBooks, initialTotalPages]);

  const handleSearch = (newSearch) => {
    router.push(`/?page=1&search=${newSearch}&genre=${genre}`);
  };

  const handleGenreChange = (newGenre) => {
    router.push(`/?page=1&search=${search}&genre=${newGenre}`);
  };

  const handlePageChange = (newPage) => {
    router.push(`/?page=${newPage}&search=${search}&genre=${genre}`);
  };

  const handleWishlist = (book) => {
    setWishlist((prev) =>
      prev.includes(book.id)
        ? prev.filter((id) => id !== book.id)
        : [...prev, book.id]
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
        <SearchBar onSearch={handleSearch} initialValue={search} />
        <GenreFilter onFilterChange={handleGenreChange} initialValue={genre} />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg">Loading books...</p>
        </div>
      ) : books.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              isWishlisted={wishlist.includes(book.id)}
              onWishlist={handleWishlist}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg">
            No books found. Try adjusting your search or filters.
          </p>
        </div>
      )}

      <div className="mt-8">
        <PaginationComponent
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default BookList;
