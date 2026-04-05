import Skeleton from "./Skeleton";
import ProductCardSkeleton from "./ProductCardSkeleton";

const PageSkeleton = () => (
  <div className="min-h-screen pt-24 px-6 max-w-7xl mx-auto">
    <Skeleton className="h-8 w-48 mb-8" />
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  </div>
);

export default PageSkeleton;
