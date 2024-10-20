"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Heart, ArrowLeft, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import useLocalStorage from "@/hooks/useLocalStorage";

const BookDetailsClient = ({ bookId, readOnlineLink }) => {
  const router = useRouter();
  const [wishlist, setWishlist] = useLocalStorage("wishlist", []);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      setIsWishlisted(wishlist.includes(bookId));
    }
  }, [isMounted, wishlist, bookId]);

  const handleWishlist = useCallback(() => {
    setWishlist((prev) =>
      prev.includes(bookId)
        ? prev.filter((id) => id !== bookId)
        : [...prev, bookId]
    );
  }, [bookId, setWishlist]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="mt-6 flex flex-col gap-4 max-w-4xl mx-auto px-4 sm:px-6 lg:px-0">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-4 sm:mb-0"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
          <Button className="w-full sm:w-auto" onClick={handleWishlist}>
            <Heart
              className={`mr-2 h-4 w-4 ${
                isWishlisted ? "fill-current text-red-500" : ""
              }`}
            />
            {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          </Button>
          {readOnlineLink && (
            <Button asChild className="w-full sm:w-auto">
              <a
                href={readOnlineLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="mr-2 h-4 w-4" />
                Read Online
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetailsClient;
