"use client";

import { type Cruise, getData } from "@/services/api";
import { useCallback, useEffect, useMemo, useState } from "react";
import Sailing from "./Sailing";
import Pagination from "./Pagination";
import Select from "./Select";


export default function SailingTable() {
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [selectedOption, setSelectedOption] = useState(null);

    const [results, setResults] = useState<Cruise[]>([]);

    // Calculate total pages
    const totalPages = Math.ceil(results.length / itemsPerPage);

    // Paginated data using slice
    const paginatedData = useMemo(() => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return results.slice(startIndex, endIndex);
    }, [currentPage, itemsPerPage, results]);

    const handlePageChange = (page : number) => {
      setCurrentPage(() => page);
    };

    // Handle items per page change
    const handleItemsPerPageChange = (newItemsPerPage : number) => {
      setItemsPerPage(() => newItemsPerPage);
      setCurrentPage(() => 1); // Reset to first page
    };

    // Generate page numbers for pagination controls
    const getPageNumbers = () => {
      const totalPageNumbers = 5; // Adjust how many buttons you want visible
      const siblingCount = 1;
    
      const range = (start : number, end : number) => {
        const length = end - start + 1;
        return Array.from({ length }, (_, idx) => start + idx);
      };
    
      if (totalPages <= totalPageNumbers) {
        return range(1, totalPages);
      }
    
      const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
      const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);
    
      const shouldShowLeftDots = leftSiblingIndex > 2;
      const shouldShowRightDots = rightSiblingIndex < totalPages - 1;
    
      const firstPage = 1;
      const lastPage = totalPages;
    
      if (!shouldShowLeftDots && shouldShowRightDots) {
        const leftRange = range(1, 3 + siblingCount);
        return [...leftRange, '...', totalPages];
      }
    
      if (shouldShowLeftDots && !shouldShowRightDots) {
        const rightRange = range(totalPages - (2 +  siblingCount), totalPages);
        return [firstPage, '...', ...rightRange];
      }
    
      if (shouldShowLeftDots && shouldShowRightDots) {
        const middleRange = range(leftSiblingIndex, rightSiblingIndex);
        return [firstPage, '...', ...middleRange, '...', lastPage];
      }

      return [1];
    };

    const sortResults = useCallback((option: string, data: Cruise[]) => {
      const sorted = [...data];
    
      switch (option) {
        case 'PLF':
          return sorted.sort((a, b) => Number(a.price) - Number(b.price));
        case 'PHF':
          return sorted.sort((a, b) => Number(b.price) - Number(a.price));
        case 'DDLF':
          return sorted.sort((a, b) => new Date(a.departureDate).getTime() - new Date(b.departureDate).getTime());
        case 'DDHF':
          return sorted.sort((a, b) => new Date(b.departureDate).getTime() - new Date(a.departureDate).getTime());
        case 'DLF':
          return sorted.sort((a, b) => a.duration - b.duration);
        case 'DHF':
          return sorted.sort((a, b) => b.duration - a.duration);
        default:
          return sorted;
      }
    }, []);
    
    const fetchData = useCallback(async () => {
        try {
          setIsLoading(() => true);
          const response = await getData();
          if (Array.isArray(response)) {
            setResults(() => response);
          } else {
            console.error("Unexpected response structure:", response);
            setResults(() => []);
          }
        } catch (error) {
          console.error("Error", error)
        } finally {
          setIsLoading(() => false);
        }
    }, []);

    useEffect(() => {
      if (selectedOption) {
        setResults(prev => sortResults(selectedOption, prev));
        setCurrentPage(1); // Reset to first page on sort change
      }
    }, [selectedOption, sortResults]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
    <div className="w-full h-full flex flex-col gap-6 justify-center items-center py-10">
        <div className="self-end">
          <Select 
            label="Sort by"
            options={['PLF','PHF','DDLF','DDHF','DLF','DHF']}
            selected={selectedOption}
            onChange={setSelectedOption}
          />
        </div>
        
        {paginatedData.map((sailing: Cruise, index) => (
            <Sailing key={index} sailing={sailing}/>
        ))}

        <Pagination getPageNumbers={getPageNumbers} handlePageChange={handlePageChange} totalPages={totalPages} currentPage={currentPage} itemsPerPage={itemsPerPage}  totalLength={results.length} />
    </div>
    );
  }
  