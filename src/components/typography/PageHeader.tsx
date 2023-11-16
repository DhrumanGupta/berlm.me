import React from "react";

function PageHeader({ children }: { children: React.ReactNode }) {
  return <h1 className="text-3xl md:text-4xl font-bold mb-2">{children}</h1>;
}

export default PageHeader;
