import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { formatRecipeName, fetchImage } from "../../util/helper";
import LoadingSpinner from "../common/LoadingSpinner"; // Import the LoadingSpinner component

const RecipeList = ({ recipes }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipeImages, setRecipeImages] = useState({});
  const [loading, setLoading] = useState(true);

  // Filter recipes based on search query
  const filteredRecipes = Object.values(recipes).filter((recipe) =>
    formatRecipeName(recipe.recipe_name)
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const fetchImages = async () => {
      const images = {};
      // Loop through all recipes and fetch images based on recipe names
      for (const recipe of Object.values(recipes)) {
        const formattedName = formatRecipeName(recipe.recipe_name);
        const imageUrl = await fetchImage(formattedName);
        images[recipe.recipe_name] = imageUrl;
      }
      setRecipeImages(images);
      setLoading(false); // Set loading to false once images are fetched
    };

    fetchImages();
  }, [recipes]);

  return (
    <div className="recipe-list-container">
      {/* Section for search functionality */}
      <section className="search-section">
        <h2 className="section-heading">Find Your Favorite Recipe</h2>
        <input
          type="text"
          placeholder="Search Recipes..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </section>

      {/* Section for recipe list */}
      <section className="recipe-section">
        <h2 className="section-heading">Available Recipes</h2>
        <div className="recipe-grid">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe, index) => (
              <div key={index} className="recipe-card">
                {loading ? (
                  <LoadingSpinner />
                ) : recipeImages[recipe.recipe_name] ? (
                  <img
                    src={recipeImages[recipe.recipe_name]}
                    alt={recipe.recipe_name}
                    className="recipe-image"
                  />
                ) : (
                  <div className="recipe-placeholder">No Image</div>
                )}
                <div className="recipe-details">
                  <h3 className="recipe-title">
                    {formatRecipeName(recipe.recipe_name)}
                  </h3>
                  <div className="recipe-subInfo">
                    <p className="recipe-infoList">
                      <strong>Food Role:</strong>{" "}
                      {recipe.food_role ? recipe.food_role.join(", ") : "N/A"}
                    </p>
                    <p className="recipe-infoList">
                      <strong>Prep Time:</strong>{" "}
                      {recipe.prep_time !== "" ? recipe.prep_time : "N/A"}
                    </p>
                    <p className="recipe-infoList">
                      <strong>Cook Time:</strong>{" "}
                      {recipe.cook_time !== "" ? recipe.cook_time : "N/A"}
                    </p>
                  </div>
                  <Link
                    to={`/recipes/${recipe.recipe_name}`}
                    className="view-recipe-link"
                  >
                    View Recipe
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="no-recipes-message">No recipes found!</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default RecipeList;
