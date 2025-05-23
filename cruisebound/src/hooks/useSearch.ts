import { useMemo, useState } from "react";
import { type Cruise } from "@/services/api";

export function useSearch(results: Cruise[]) {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  //Memorized filtered results based on the searchTerm and results
  //useMemo prevents recalculating filteredResults unless results or searchTerm changes
  const filteredResults = useMemo(() => {
    //Return if empty
    if (!searchTerm.trim()) return results;
    
    //Filter cruises based on searchTerm
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

  //Updates the input field's state on every keystroke
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  
  const handleSearch = () => {
    setSearchTerm(searchInput);
  };
  
  //Search on enter key pressed
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  //Clears search
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