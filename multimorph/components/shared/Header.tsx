import React from "react";

const Header = ({ title, subtitle }: { title: string; subtitle?: string }) => {
  return (
    <>
    <h2 className="font-bold text-dark-600 pl-5 text-2xl">{title}</h2>
    {subtitle && <p className="p-16-regular mt-4 pl-5">{subtitle}</p>}
    </>
  )
};

export default Header;
