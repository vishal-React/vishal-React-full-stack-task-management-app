import React, { createContext, useState, useEffect, useCallback } from "react";

export const RecipesContext = createContext();

const RecipesProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [searchItem, setSearchItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("pizza");

  const API_BASE = "https://api.unsplash.com/search/photos";
  const CLIENT_ID = "9Dtwqe4dDELs9RoLeitmD_Yvk4lAqgMmdFNpQTCG-9w";

  // for menu page
  const fetchApi = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${API_BASE}?query=burger&page=${page}&client_id=${CLIENT_ID}`
      );
      const data = await res.json();
      setRecipes(
        page === 1 ? data.results : (prev) => [...prev, ...data.results]
      );
      setLoading(false);
    } catch (error) {
      console.error("Error fetching API data:", error);
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  // for search page
  const fetchSearchResults = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${API_BASE}?query=${searchQuery}&page=${pages}&client_id=${CLIENT_ID}`
      );
      const data = await res.json();

      if (pages === 1) {
        setSearchItem(data.results);
      } else {
        setSearchItem((prevRecipes) => [...prevRecipes, ...data.results]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching API data:", error);
      setLoading(false);
    }
  }, [searchQuery, pages]);

  // Whenever the searchQuery changes, reset pages to 1 and fetch new results
  useEffect(() => {
    if (searchQuery) {
      setPages(1);
      setSearchItem([]); // Clear previous search results
    }
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery) {
      fetchSearchResults();
    }
  }, [searchQuery, pages, fetchSearchResults]);

  return (
    <RecipesContext.Provider
      value={{
        loading,
        recipes,
        searchItem,
        searchQuery,
        setPage,
        setPages,
        setSearchQuery,
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
};

export default RecipesProvider;
