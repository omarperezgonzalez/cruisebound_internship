interface SearchBarProps {
  searchInput: string;
  searchTerm: string;
  onSearchInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
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
      <div className="relative lg:w-1/2 w-full flex">
        <input
          type="text"
          placeholder="Search cruises..."
          value={searchInput}
          onChange={onSearchInputChange}
          onKeyDown={onKeyPress}
          className={"flex-1 placeholder:text-gray-400 px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none rounded-l-lg"}
        />
  
        {searchTerm && (
          <button
            onClick={onClearSearch}
            className="px-3 py-2 text-gray-400 border-l-0 hover:text-gray-600 border border-gray-300"
          >
            ✕
          </button>
        )}
        
        <button
          onClick={onSearch}
          className="px-4 py-2  text-white bg-blue-600 hover:bg-blue-700 border border-blue-500 rounded-r-lg"
        >
          Search
        </button>
      </div>
    );
}