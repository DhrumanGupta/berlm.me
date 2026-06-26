import React from "react";

function PageHeader({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="font-serif text-3xl md:text-4xl font-normal mb-2 text-primary">
      {children}
    </h1>
  );
}

export default PageHeader;
