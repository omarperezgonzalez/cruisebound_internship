import { useMemo, useState } from "react";
import { type Cruise } from "@/services/api";

export function useSearch(results: Cruise[]) {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredResults = useMemo(() => {
    if (!searchTerm.trim()) return results;
    
    return results.filter((cruise) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        cruise.name?.toLowerCase().includes(searchLower) ||
        cruise.region?.toLowerCase().includes(searchLower) ||
        cruise.ship?.name?.toLowerCase().includes(searchLower) ||
        cruise.ship?.line?.name?.toLowerCase().includes(searchLower) ||
        cruise.itinerary?.some(item => item.toLowerCase().includes(searchLower)) ||
        cruise.price?.toString().includes(searchLower)
      );
    });
  }, [results, searchTerm]);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  
  const handleSearch = () => {
    setSearchTerm(searchInput);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  const clearSearch = () => {
    setSearchInput("");
    setSearchTerm("");
  };

  return {
    searchInput,
    searchTerm,
    filteredResults,
    handleSearchInputChange,
    handleSearch,
    handleKeyPress,
    clearSearch
  };
}