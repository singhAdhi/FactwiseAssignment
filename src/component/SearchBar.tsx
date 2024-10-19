import React from "react";

interface SerachType { 
  value: string,
  onChange: (e:React.ChangeEvent<HTMLInputElement>) => void
}

const SearchBar:React.FC<SerachType> = ({ value, onChange }) => {
  return (
    <div>
      <form action="">
        <input
          type="text"
          value={value}
          onChange={onChange}
          className="mb-4 p-2 border border-gray-300 rounded-lg w-full"
          placeholder="Search User"
        />
      </form>
    </div>
  );
};

export default SearchBar;
