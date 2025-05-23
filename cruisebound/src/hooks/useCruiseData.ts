import { type Cruise, getData } from "@/services/api";
import { useCallback, useEffect, useState } from "react";

export function useCruiseData() {
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState<Cruise[]>([]);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getData();
      if (Array.isArray(response)) {
        setResults(response);
      } else {
        console.error("Unexpected response structure:", response);
        setResults([]);
      }
    } catch (error) {
      console.error("Error", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { isLoading, results, setResults };
}