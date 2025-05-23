interface SearchResultsProps {
    searchTerm: string;
    resultCount: number;
  }
  
export default function SearchResults({ searchTerm, resultCount }: SearchResultsProps) {
    if (!searchTerm) return null;
  
    return (
      <div className="text-sm text-gray-600">
        {resultCount > 0 
          ? `Found ${resultCount} cruise${resultCount !== 1 ? 's' : ''} matching "${searchTerm}"`
          : `No cruises found matching "${searchTerm}"`
        }
      </div>
    );
  }
  
  // components/LoadingState.tsx
  function LoadingState() {
    return (
      <div className="text-center py-8">
        <div className="text-gray-600">Loading cruises...</div>
      </div>
    );
};