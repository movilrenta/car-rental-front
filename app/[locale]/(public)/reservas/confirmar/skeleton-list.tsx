import React from "react";
import { SkeletonItem } from "./skeleton-item";

export const SkeletonList = () => {
  //!Falta acomodar separacion de items y probar la altura del list
  return (
    <ul className="w-full space-y-6">
      {Array.from({ length: 4 }).map((_, index) => (
        <React.Fragment key={index}>
          <SkeletonItem />
          {index < 3 && (
            <hr className="w-full h-[2px] animate-pulse bg-gray-500 dark:bg-slate-100"/>
          )}
        </React.Fragment>
      ))}
    </ul>
  );
};