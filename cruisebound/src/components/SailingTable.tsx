"use client";

import { type Cruise } from "@/services/api";
import Sailing from "./Sailing";
import Pagination from "./Pagination";
import Select from "./Select";
import { useCruiseData } from "../hooks/useCruiseData";
import { useSearch } from "../hooks/useSearch";
import { usePagination } from "../hooks/usePagination";
import { useSorting } from "../hooks/useSorting";
import SearchBar from "./Search";
import SearchResults from "./SearchResults";
import EmptyData from "./EmptyData";
import LoadingData from "./LoadingData";

export default function SailingTable() {
  const { isLoading, results, setResults } = useCruiseData();
  const { selectedOption, setSelectedOption } = useSorting(setResults);
  const {
    searchInput,
    searchTerm,
    filteredResults,
    handleSearchInputChange,
    handleSearch,
    handleKeyPress,
    clearSearch
  } = useSearch(results);
  
  const {
    currentPage,
    itemsPerPage,
    totalPages,
    paginatedData,
    handlePageChange,
    resetToFirstPage,
    getPageNumbers
  } = usePagination(filteredResults.length);

  // Get paginated data
  const currentData = filteredResults.slice(paginatedData.startIndex, paginatedData.endIndex);

  // Reset to first page on search or sort
  const handleSearchWithReset = () => {
    handleSearch();
    resetToFirstPage();
  };

  const handleClearSearchWithReset = () => {
    clearSearch();
    resetToFirstPage();
  };

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
}