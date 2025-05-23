import { ArrowLeft, ArrowRight } from "lucide-react";

interface PaginationProps {
    getPageNumbers : Function,
    handlePageChange : Function,
    totalPages : number,
    currentPage : number,
    itemsPerPage : number,
    totalLength : number
}

export default function Pagination({ getPageNumbers, handlePageChange, totalPages, currentPage, itemsPerPage, totalLength } : PaginationProps){
  return(
    <div className="flex flex-col items-center gap-2.5">
      
      {/* Page buttons */}
      <div className="flex items-center gap-1 flex-wrap">
        
        {/* 
          Previous button
          Disabled when we are at the first page
        */}
        {
          totalPages > 1 && 
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="cursor-pointer px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4"/>
            </button>
        }
        
        {/* 
          Page numbers 
          If "page" is a number it is used as a button to navigate through them
          If not it is just a span with "..."
        */}
        {getPageNumbers().map((page : number | string, index : number) => (
          typeof page === 'number' ? (
            <button
              key={index}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 text-sm border rounded cursor-pointer ${
                page === currentPage
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'border-gray-300 hover:bg-blue-50'
              }`}
            >
              {page}
            </button>
          ) : (
            <span
              key={index}
              className="px-3 py-1 text-sm text-gray-500"
            >
              ...
            </span>
          )
        ))}
        
        {/* 
          Next button
          Disabled when we are at the last page
        */}
        {
          totalPages > 1 && 
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="cursor-pointer px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowRight className="w-4"/>
            </button>
        }
      </div>
      
      {/* Page info */}
      <div className="text-sm text-gray-700">
        Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalLength)} of {totalLength} results
      </div>
    </div>
  );
};