"use client"; //Enables client-side rendering in Next.js

//Types and components
import { type Cruise } from "@/services/api";
import Sailing from "./Sailing";
import Pagination from "./Pagination";
import Select from "./Select";
import SearchBar from "./Search";
import SearchResults from "./SearchResults";
import EmptyData from "./EmptyData";
import LoadingData from "./LoadingData";

//Custom hooks for managing state
import { useCruiseData } from "../hooks/useCruiseData"; //Fetch and manage cruise data
import { useSearch } from "../hooks/useSearch"; //Handle search input and its actions
import { usePagination } from "../hooks/usePagination"; //Manage pagination state
import { useSorting } from "../hooks/useSorting"; //Handle sorting logic

export default function SailingTable() {
  //Fetch cruise data and manage loading state
  const { isLoading, results, setResults } = useCruiseData();

  //Manage selected sorting option
  const { selectedOption, setSelectedOption } = useSorting(setResults);
  
  //Manage search input and filtered data based on search term
  const {
    searchInput,
    searchTerm,
    filteredResults,
    handleSearchInputChange,
    handleSearch,
    handleKeyPress,
    clearSearch
  } = useSearch(results);
  
  //Setup pagination based on filtered results
  const {
    currentPage,
    itemsPerPage,
    totalPages,
    paginatedData,
    handlePageChange,
    resetToFirstPage,
    getPageNumbers
  } = usePagination(filteredResults.length);

  //Get paginated and searched data
  const currentData = filteredResults.slice(paginatedData.startIndex, paginatedData.endIndex);

  //Reset to first page on search or sort
  const handleSearchWithReset = () => {
    handleSearch();
    resetToFirstPage();
  };

  //Clear search input and reset pagination
  const handleClearSearchWithReset = () => {
    clearSearch();
    resetToFirstPage();
  };

  //Update sorting option and reset to first page
  const handleSortChange = (option: string | null) => {
    setSelectedOption(option);
    resetToFirstPage();
  };

  return (
    <div className="w-full h-full flex justify-center items-center py-10">
      <div className="flex flex-col gap-6 justify-center items-center">

        {/* Search and Sort Controls */}
        <div className="w-full flex lg:flex-row lg:gap-0 gap-5 flex-col-reverse flex-wrap justify-between items-end">
          <SearchBar
            searchInput={searchInput}
            searchTerm={searchTerm}
            onSearchInputChange={handleSearchInputChange}
            onSearch={handleSearchWithReset}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearchWithReset();
              }
            }}
            onClearSearch={handleClearSearchWithReset}
          />

          <div className="sm:w-auto">
            <Select 
              label="Sort by"
              options={['PLF','PHF','DDLF','DDHF','DLF','DHF']}
              selected={selectedOption}
              onChange={handleSortChange}
            />
          </div>
        </div>
        
        <SearchResults searchTerm={searchTerm} resultCount={filteredResults.length} />

        {isLoading && <LoadingData />}

        {!isLoading && filteredResults.length === 0 && <EmptyData searchTerm={searchTerm} />}
        
        {!isLoading && currentData.map((sailing: Cruise, index) => (
          <Sailing key={index} sailing={sailing}/>
        ))}

        {!isLoading && filteredResults.length > 0 && (
          <Pagination 
            getPageNumbers={getPageNumbers} 
            handlePageChange={handlePageChange} 
            totalPages={totalPages} 
            currentPage={currentPage} 
            itemsPerPage={itemsPerPage}  
            totalLength={filteredResults.length} 
          />
        )}
      </div>
    </div>
  );
};