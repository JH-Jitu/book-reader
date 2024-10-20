import { Skeleton } from "./ui/skeleton";

export const LoadingSkeleton = () => (
  <>
    {[...Array(8)].map((_, index) => (
      <div key={index} className="space-y-3">
        <Skeleton className="h-[125px] w-full rounded-xl" />
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    ))}
  </>
);
