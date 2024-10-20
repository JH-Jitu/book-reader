"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const genres = [
  "Fiction",
  "Science Fiction",
  "Fantasy",
  "Mystery",
  "Thriller",
  "Romance",
  "Non-fiction",
  "Biography",
  "History",
  "Self-help",
  "Poetry",
];

const GenreFilter = ({ onFilterChange, initialValue = "" }) => {
  return (
    <Select
      onValueChange={onFilterChange}
      defaultValue={initialValue || undefined}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select genre" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Genres</SelectItem>
        {genres.map((genre) => (
          <SelectItem key={genre} value={genre.toLowerCase()}>
            {genre}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default GenreFilter;
