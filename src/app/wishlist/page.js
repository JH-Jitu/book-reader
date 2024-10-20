"use client";

import React, { useState, useEffect } from "react";
import { fetchBookById } from "@/lib/api";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import BookCard from "@/components/BookCard";
import { LoadingSkeleton } from "@/components/LoadingSkeletonCard";

const WishlistClient = () => {
  const [wishlistIds, setWishlistIds] = useLocalStorage("wishlist", []);
  const [wishlistBooks, setWishlistBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWishlistBooks = async () => {
      setIsLoading(true);
      try {
        const books = await Promise.all(
          wishlistIds.map(async (id) => {
            try {
              return await fetchBookById(id);
            } catch (error) {
              console.error(`Failed to fetch book with id ${id}:`, error);
              return null;
            }
          })
        );
        setWishlistBooks(books.filter((book) => book !== null));
      } catch (error) {
        console.error("Failed to fetch wishlist books:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishlistBooks();
  }, [wishlistIds]);

  const handleRemoveFromWishlist = (bookId) => {
    setWishlistIds((prev) => prev.filter((id) => id !== bookId));
    setWishlistBooks((prev) => prev.filter((book) => book.id !== bookId));
  };

  const handleClearWishlist = () => {
    setWishlistIds([]);
    setWishlistBooks([]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <p className="text-lg">{wishlistBooks.length} books in your wishlist</p>
        <Button variant="destructive" onClick={handleClearWishlist}>
          <Trash2 className="mr-2 h-4 w-4" />
          Clear Wishlist
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading && <LoadingSkeleton />}
        {wishlistBooks?.length > 0 ? (
          wishlistBooks.map(
            (book) =>
              book && (
                <BookCard
                  key={book.id}
                  book={book}
                  isWishlisted={true}
                  onWishlist={() => handleRemoveFromWishlist(book.id)}
                />
              )
          )
        ) : (
          <>
            {!isLoading && (
              <div className="col-span-full flex justify-center items-center min-h-[200px]">
                <div className="text-center">
                  <p className="text-xl mb-4">Your wishlist is empty.</p>
                  <Button asChild>
                    <a href="/books">Browse Books</a>
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default WishlistClient;
