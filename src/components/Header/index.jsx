import React from "react";

const Header = ({ title }) => {
  return (
    <div>
      <div className=" h-16 flex items-center  bg-gray-100">
        <h2 className="text-sm lg:text-2xl font-semibold text-foreground truncate">
          {title}
        </h2>
      </div>
    </div>
  );
};

export default Header;
