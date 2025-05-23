import { useMemo, useState } from "react";

export function usePagination(totalItems: number, initialItemsPerPage = 10) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  //useMemo to memorize start and end indices calculation
  //so it only recalculates when currentPage or itemsPerPage change
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  }, [currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const resetToFirstPage = () => {
    setCurrentPage(1);
  };

  //Returns an array of page numbers and dots (if necessary) for pagination UI
  const getPageNumbers = () => {
    //Maximum number of page buttons to show (excluding the dots)
    const totalPageNumbers = 5;
    //Number of page buttons to show on each side of the current page
    const siblingCount = 1;

    const range = (start: number, end: number) => {
      const length = end - start + 1;
      return Array.from({ length }, (_, idx) => start + idx);
    };

    //Show all pages (no dots needed)
    if (totalPages <= totalPageNumbers) {
      return range(1, totalPages);
    }

    //Calculate left and right sibling page indices around the current page
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    //Determine if gap exists between first page and left sibling
    const shouldShowLeftDots = leftSiblingIndex > 2;
    //Determine if gap exists between right sibling and last page
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    const firstPage = 1;
    const lastPage = totalPages;

    //Start of cases depending on the shouldShowLeftDots and shouldShowRightDots
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftRange = range(1, 3 + siblingCount);
      return [...leftRange, '...', totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightRange = range(totalPages - (2 + siblingCount), totalPages);
      return [firstPage, '...', ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPage, '...', ...middleRange, '...', lastPage];
    }

    //Fallback: show just the first page (just in case)
    return [1];
  };

  return {
    currentPage,
    itemsPerPage,
    totalPages,
    paginatedData,
    handlePageChange,
    handleItemsPerPageChange,
    resetToFirstPage,
    getPageNumbers
  };
}