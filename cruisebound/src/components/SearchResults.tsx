interface SearchResultsProps {
  searchTerm: string;
  resultCount: number;
}
  
export default function SearchResults({ searchTerm, resultCount }: SearchResultsProps) {
  if (!searchTerm) return null; //No render if no search term

  return (
    <div className="text-sm text-gray-600">
      {resultCount > 0 
        ? `Found ${resultCount} cruise${resultCount !== 1 ? 's' : ''} matching "${searchTerm}"`
        : `No cruises found matching "${searchTerm}"`
      }
    </div>
  );
};