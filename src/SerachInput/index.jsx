import { useEffect, useRef, useState } from "react";
import { fetchCities } from "../utils";

export default function SearchInput({
  setCities,
  setTotalPages,
  rowsPerPage,
  currentPage,
  setLoading,
}) {
  const inputRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "/") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (rowsPerPage < 1 || rowsPerPage > 10) return;
    const fetchData = async () => {
      if (!inputRef.current?.value)
        return setCities({ message: "Start searching" });
      const cities = await fetchCities({
        searchTerm,
        rowsPerPage,
        currentPage,
        setLoading,
      });
      if (inputRef.current?.value && !cities.data.length) {
        setCities({ message: "No result found" });
        return;
      }
      setCities(cities.data);
      setTotalPages(Math.ceil(cities.metadata?.totalCount / rowsPerPage));
    };

    const debounceTimer = setTimeout(fetchData, 1000);
    return () => clearTimeout(debounceTimer);
  }, [
    searchTerm,
    currentPage,
    rowsPerPage,
    setCities,
    setTotalPages,
    setLoading,
  ]);

  return (
    <div>
      <form>
        <input
          type="text"
          id="search-city"
          ref={inputRef}
          placeholder="Search places..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
    </div>
  );
}
