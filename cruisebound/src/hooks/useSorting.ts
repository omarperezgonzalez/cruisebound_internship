import { useCallback, useEffect, useState } from "react";
import { type Cruise } from "@/services/api";

export function useSorting(setResults: React.Dispatch<React.SetStateAction<Cruise[]>>) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

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

  useEffect(() => {
    if (selectedOption) {
      setResults(prev => sortResults(selectedOption, prev));
    }
  }, [selectedOption, sortResults, setResults]);

  return { selectedOption, setSelectedOption };
}