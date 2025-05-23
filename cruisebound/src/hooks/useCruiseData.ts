import { type Cruise, getData } from "@/services/api";
import { useCallback, useEffect, useState } from "react";

export function useCruiseData() {
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState<Cruise[]>([]);

  //useCallback to memorize fetchData function,
  //avoiding unnecessary useEffect triggers
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true); //Start loading state
      const response = await getData();

      //Check if response is an array of cruises
      if (Array.isArray(response)) {
        setResults(response);
      } else {
        console.error("Unexpected response structure:", response);
        setResults([]); //Reset results on bad data
      }
    } catch (error) {
      console.error("Error", error);
    } finally {
      setIsLoading(false); //End loading state
    }
  }, []);

  //Fetch data on mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { isLoading, results, setResults };
}