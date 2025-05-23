import { useCallback, useEffect, useState } from "react";
import { type Cruise } from "@/services/api";

export function useSorting(setResults: React.Dispatch<React.SetStateAction<Cruise[]>>) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  //This is important because sortResults is used inside useEffect's dependency array, preventing unnecessary effect runs due to function identity changes
  const sortResults = useCallback((option: string, data: Cruise[]) => {
    //Create a shallow copy to avoid mutating original data
    const sorted = [...data];

    switch (option) {
      case 'PLF': //Price Low to High
        return sorted.sort((a, b) => Number(a.price) - Number(b.price));
      case 'PHF': //Price High to Low
        return sorted.sort((a, b) => Number(b.price) - Number(a.price));
      case 'DDLF': //Departure Date Low to High (earliest first)
        return sorted.sort((a, b) => new Date(a.departureDate).getTime() - new Date(b.departureDate).getTime());
      case 'DDHF': //Departure Date High to Low (latest first)
        return sorted.sort((a, b) => new Date(b.departureDate).getTime() - new Date(a.departureDate).getTime());
      case 'DLF': //Duration Low to High (shortest first)
        return sorted.sort((a, b) => a.duration - b.duration);
      case 'DHF': //Duration High to Low (longest first)
        return sorted.sort((a, b) => b.duration - a.duration);
      default:
        //If not recognized, return data unsorted
        return sorted;
    }
  }, []);

  //Effect runs every time the selected sorting option changes
  useEffect(() => {
    if (selectedOption) {
      setResults(prev => sortResults(selectedOption, prev));
    }
  }, [selectedOption, sortResults, setResults]);

  return { selectedOption, setSelectedOption };
}