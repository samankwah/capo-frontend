import Skeleton from "./Skeleton";

const CategoryCardSkeleton = () => (
  <div className="relative rounded-xl overflow-hidden">
    <Skeleton className="w-full h-48 rounded-none" />
    <div className="absolute inset-0 flex items-center justify-center">
      <Skeleton className="h-6 w-32 bg-gray-400" />
    </div>
  </div>
);

export default CategoryCardSkeleton;
