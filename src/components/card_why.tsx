import React from "react";

export function Card({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className=" py-6 border-b-2 border-white">
      <div className="flex items-center">
        <div className="pr-8">
            {children}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">{ title }</h2>
          <p className="mt-2 text-gray-700">
            { description }
          </p>
        </div>
      </div>
    </div>
  );
}
