import Skeleton from "./Skeleton";

const ProductCardSkeleton = () => (
  <div className="bg-white rounded-xl shadow p-4">
    <Skeleton className="w-full h-48 mb-4" />
    <Skeleton className="h-5 w-3/4 mb-2" />
    <Skeleton className="h-5 w-1/3 mb-4" />
    <div className="flex items-center justify-between">
      <Skeleton className="h-9 w-24 rounded-lg" />
      <Skeleton className="h-4 w-12" />
    </div>
  </div>
);

export default ProductCardSkeleton;
