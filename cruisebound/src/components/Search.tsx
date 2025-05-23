interface SearchBarProps {
  searchInput: string;
  searchTerm: string;
  onSearchInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void; //Handle Enter key events
  onClearSearch: () => void;
};
  
export default function SearchBar({ 
  searchInput, 
  searchTerm, 
  onSearchInputChange, 
  onSearch, 
  onKeyPress, 
  onClearSearch 
}: SearchBarProps) {
  return (
    <div className="relative lg:w-1/2 w-full flex transform transition-all duration-300 ease-in-out hover:shadow-lg">
      <input
        type="text"
        placeholder="Search cruises..."
        value={searchInput}
        onChange={onSearchInputChange}
        onKeyDown={onKeyPress}
        className={"flex-1 placeholder:text-gray-400 px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none rounded-l-lg transition-all duration-200 ease-in-out hover:border-blue-300 focus:shadow-md"}
      />

      {/* Clear button shown only if searchTerm exists */}
      {searchTerm && (
        <button
          onClick={onClearSearch}
          className="cursor-pointer px-3 py-2 text-gray-400 border-x-0 border border-gray-300 transition-all duration-200 ease-in-out hover:bg-red-50 hover:text-red-500 hover:border-red-200"
        >
          ✕
        </button>
      )}

      <button
        onClick={onSearch}
        className="cursor-pointer px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 border border-blue-500 rounded-r-lg transition-all duration-200 ease-in-out hover:shadow-md hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 active:translate-y-0.5"
      >
        Search
      </button>
    </div>
  );
};