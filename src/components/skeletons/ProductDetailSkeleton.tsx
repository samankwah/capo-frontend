import Skeleton from "./Skeleton";

const ProductDetailSkeleton = () => (
  <div className="p-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 mt-24">
    <Skeleton className="w-full h-[400px]" />
    <div>
      <Skeleton className="h-8 w-3/4 mb-4" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6 mb-4" />
      <Skeleton className="h-7 w-1/3 mb-6" />
      <div className="flex gap-4">
        <Skeleton className="h-12 w-32 rounded" />
        <Skeleton className="h-12 w-32 rounded" />
      </div>
    </div>
  </div>
);

export default ProductDetailSkeleton;
