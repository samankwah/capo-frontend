import Skeleton from "./Skeleton";

const HeroSkeleton = () => (
  <div className="relative h-[85vh] animate-pulse bg-gray-300">
    <div className="absolute inset-0 flex items-center">
      <div className="max-w-7xl mx-auto px-6 space-y-6 w-full">
        <Skeleton className="h-12 w-96 max-w-full bg-gray-400" />
        <Skeleton className="h-5 w-64 max-w-full bg-gray-400" />
        <div className="flex space-x-4">
          <Skeleton className="h-12 w-32 bg-gray-400 rounded-md" />
          <Skeleton className="h-12 w-36 bg-gray-400 rounded-md" />
        </div>
      </div>
    </div>
  </div>
);

export default HeroSkeleton;
