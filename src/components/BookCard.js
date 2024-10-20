"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import PropTypes from "prop-types";
import { Heart } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useLocalStorage from "@/hooks/useLocalStorage";

const BookCard = ({ book }) => {
  const [wishlist, setWishlist] = useLocalStorage("wishlist", []);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      setIsWishlisted(wishlist.includes(book.id));
    }
  }, [isMounted, wishlist, book.id]);

  const handleWishlist = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setWishlist((prev) =>
        prev.includes(book.id)
          ? prev.filter((id) => id !== book.id)
          : [...prev, book.id]
      );
    },
    [book.id, setWishlist]
  );

  if (!isMounted) {
    return null;
  }

  return (
    <Card className="w-full max-w-sm group relative">
      <Link href={`/books/${book.id}`} passHref>
        <CardHeader>
          <CardTitle className="text-lg truncate">{book.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full h-48 mb-4 overflow-hidden">
            {!imageLoaded && <Skeleton className="h-full w-full absolute" />}
            <Image
              src={book.formats["image/jpeg"] || "/placeholder.png"}
              alt={`Cover of ${book.title}`}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onLoad={() => setImageLoaded(true)}
              className={`rounded-lg ${
                imageLoaded ? "opacity-100" : "opacity-0"
              } transition-opacity duration-300`}
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                variant="secondary"
                size="lg"
                className="rounded-full w-20 h-20 p-4 transform scale-0 group-hover:scale-100 transition-transform duration-300"
              >
                Details
              </Button>
            </div>
          </div>
          <p className="text-sm mb-2 truncate">
            Author: {book.authors[0]?.name || "Unknown"}
          </p>
          <p className="text-sm mb-2 truncate">
            Genre: {book.subjects[0] || "Unspecified"}
          </p>
        </CardContent>
      </Link>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleWishlist}
          aria-label={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <Heart
            className={`mr-2 h-4 w-4 ${
              isWishlisted ? "fill-current text-red-500" : ""
            }`}
          />
          {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        </Button>
      </CardFooter>
    </Card>
  );
};

BookCard.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      })
    ),
    subjects: PropTypes.arrayOf(PropTypes.string),
    formats: PropTypes.object,
  }).isRequired,
};

export default BookCard;
