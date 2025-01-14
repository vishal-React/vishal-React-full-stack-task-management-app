import React, { createContext, useState, useEffect, useCallback } from "react";

export const RecipesContext = createContext();

const RecipesProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const API =
    "https://api.unsplash.com/search/photos?query=burger&client_id=9Dtwqe4dDELs9RoLeitmD_Yvk4lAqgMmdFNpQTCG-9w";

  const fetchApi = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}&page=${page}`);
      const data = await res.json();

      if (page === 1) {
        setRecipes(data.results);
        setFilteredRecipes(data.results);
      } else {
        setRecipes((prevRecipes) => [...prevRecipes, ...data.results]);
        setFilteredRecipes((prevFilteredRecipes) => [
          ...prevFilteredRecipes,
          ...data.results,
        ]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching API data:", error);
      setLoading(false);
    }
  }, [API, page]); 

  const filterRecipes = (searchQuery) => {
    const query = searchQuery.toLowerCase();
    const filtered = recipes.filter((recipe) =>
      recipe.alt_description.toLowerCase().includes(query)
    );
    setFilteredRecipes(filtered);
  };

  useEffect(() => {
    fetchApi();
  }, [fetchApi]); 

  return (
    <RecipesContext.Provider
      value={{
        recipes,
        filteredRecipes,
        loading,
        filterRecipes,
        setPage,
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
};

export default RecipesProvider;
