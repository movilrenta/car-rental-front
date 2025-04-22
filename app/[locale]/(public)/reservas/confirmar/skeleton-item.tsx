import React from "react";

export const SkeletonItem = () => {
  return (
    <li className="grid grid-cols-12 gap-2 items-center">
      <div className="col-span-3 flex items-center justify-center">
        <div className="w-16 md:w-20 h-16 md:h-20 bg-slate-200 animate-pulse rounded-full"></div>
      </div>
      <div className="col-span-9">
        <div className="flex items-center justify-between mb-4">
          <div className="w-24 h-3 md:h-4 md:w-32 bg-slate-200 animate-pulse rounded-md"></div>
          <div className="w-16 h-3 md:h-4 md:w-20 bg-slate-200 animate-pulse rounded-md"></div>
        </div>
        <div className="mt-0 space-y-4">
          <div className="w-full h-3 md:h-4 bg-slate-200 animate-pulse rounded-md"></div>
          <div className="w-full h-3 md:h-4 bg-slate-200 animate-pulse rounded-md"></div>
        </div>
      </div>
    </li>
  );
};
