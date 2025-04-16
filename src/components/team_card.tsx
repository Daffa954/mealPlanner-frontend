import React from "react";

export function TeamCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="md:w-[280px] w-full  bg-white  rounded-lg shadow-sm border-[1.5px] border-gray-300">
      <a href="#">{children}</a>
      <div className="p-5 border-t-2 border-gray-200">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
            {title}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
        
      </div>
    </div>
  );
}
