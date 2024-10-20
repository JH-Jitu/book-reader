"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import BookCard from "./BookCard";
import SearchBar from "./SearchBar";
import GenreFilter from "./GenreFilter";
import PaginationComponent from "./Pagination";
import { fetchBooks } from "@/lib/api";
import { LoadingSkeleton } from "./LoadingSkeletonCard";

const BookList = ({
  page: initialPage,
  search: initialSearch,
  genre: initialGenre,
}) => {
  const [books, setBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();

  const [page, setPage] = useState(initialPage);
  const [search, setSearch] = useState(initialSearch);
  const [genre, setGenre] = useState(initialGenre);

  useEffect(() => {
    const loadBooks = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchBooks(
          page,
          search,
          genre === "all" ? "" : genre
        );
        setBooks(data.results);
        setTotalPages(Math.ceil(data.count / 32));
      } catch (err) {
        setError("Failed to load books. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    loadBooks();
  }, [page, search, genre]);

  const handleSearch = (newSearch) => {
    setSearch(newSearch);
    setPage(1);
    router.push(`/books?page=1&search=${newSearch}&genre=${genre}`);
  };

  const handleGenreChange = (newGenre) => {
    setGenre(newGenre);
    setPage(1);
    router.push(`/books?page=1&search=${search}&genre=${newGenre}`);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    router.push(`/books?page=${newPage}&search=${search}&genre=${genre}`);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
        <SearchBar onSearch={handleSearch} initialValue={search} />
        <GenreFilter onFilterChange={handleGenreChange} initialValue={genre} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading ? (
          <LoadingSkeleton />
        ) : error ? (
          <div className="col-span-full text-center">{error}</div>
        ) : books?.length > 0 ? (
          books.map((book) => <BookCard key={book.id} book={book} />)
        ) : (
          <div className="col-span-full flex justify-center items-center h-64">
            <p className="text-lg">
              No books found. Try adjusting your search or filters.
            </p>
          </div>
        )}
      </div>
      <div className="mt-4">
        {!isLoading && !error && (
          <PaginationComponent
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default BookList;
