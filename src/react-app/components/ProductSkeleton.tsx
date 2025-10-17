export default function ProductSkeleton() {
  return (
    <div className="bg-white/60 backdrop-blur-sm border border-white/50 shadow-soft card-sharp overflow-hidden animate-fade-in">
      {/* Image skeleton */}
      <div className="aspect-square skeleton" />
      
      {/* Content skeleton */}
      <div className="p-6 space-y-4">
        <div className="skeleton h-6 w-3/4" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-2/3" />
        <div className="flex items-center justify-between pt-2">
          <div className="skeleton h-8 w-20" />
          <div className="skeleton h-10 w-24" />
        </div>
      </div>
    </div>
  );
}
