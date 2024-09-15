import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getJpgFileName,
  formatRecipeName,
  fetchImage,
} from "../../util/helper";
import { calculateMetrics } from "../../util/validateMetrics";

import MetricsDisplay from "./MetricsDisplay";
import LoadingSpinner from "../common/LoadingSpinner";

const RecipeDetail = ({ recipes }) => {
  const { recipeName } = useParams();
  const [showMetrics, setShowMetrics] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const [ingredientImages, setIngredientImages] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundRecipe = Object.values(recipes).find(
      (r) => r.recipe_name === recipeName
    );
    if (foundRecipe) {
      setRecipe(foundRecipe);

      // Fetch images for each ingredients
      const fetchImages = async () => {
        const images = {};
        for (const ingredient of foundRecipe.ingredients) {
          const imageUrl = await fetchImage(ingredient.name);
          images[ingredient.name] = imageUrl;
        }
        setIngredientImages(images);
        setLoading(false);
      };

      fetchImages();
    }
  }, [recipeName, recipes]);

  if (!recipe) return <h3>Recipe not found!</h3>;

  const metrics = calculateMetrics(recipe);

  return (
    <div className="recipe-detail">
      <h1 className="recipeDetail-title">
        {formatRecipeName(recipe.recipe_name)}
      </h1>

      {/* Additional recipe information */}
      <section>
        <h2 className="section-headingDetails">Additional Information</h2>
        <div className="recipe-info">
          <p>
            <strong>Food Role:</strong>{" "}
            {recipe.food_role ? recipe.food_role[0] : "N/A"}
          </p>
          <p>
            <strong>Prep Time:</strong>{" "}
            {recipe.prep_time !== "" ? recipe.prep_time : "N/A"}
          </p>

          <p>
            <strong>Cook Time:</strong>{" "}
            {recipe.cook_time !== "" ? recipe.cook_time : "N/A"}
          </p>

          <p>
            <strong>Serves:</strong>{" "}
            {recipe.serves !== "" ? recipe.serves : "N/A"}
          </p>

          <p>
            <strong>Has Dairy:</strong> {recipe.hasDairy ? "Yes" : "No"}
          </p>
          <p>
            <strong>Has Meat:</strong> {recipe.hasMeat ? "Yes" : "No"}
          </p>
          <p>
            <strong>Has Nuts:</strong> {recipe.hasNuts ? "Yes" : "No"}
          </p>
        </div>
      </section>

      {/* Divider */}
      <hr className="section-divider" />

      {/* Section for ingredients */}
      <section className="ingredients-section">
        <h2 className="section-headingDetails">Ingredients</h2>
        <div className="ingredients-list">
          {recipe.ingredients.map((ingredient, index) => (
            <div key={index} className="ingredient-item">
              {loading ? (
                <LoadingSpinner />
              ) : ingredientImages[ingredient.name] ? (
                <img
                  src={ingredientImages[ingredient.name]}
                  alt={ingredient.name}
                  className="ingredient-image"
                />
              ) : (
                <div className="ingredient-image-placeholder">N/A</div>
              )}
              <div className="ingredient-details">
                <span className="ingredient-name">
                  {ingredient && ingredient.name}:{" "}
                  {ingredient.quantity && ingredient.quantity.measure}{" "}
                  {ingredient.quantity && ingredient.quantity.unit}
                </span>
                {ingredient.allergies &&
                  ingredient.allergies.category.length > 0 && (
                    <p className="ingredient-allergies">
                      <strong>Allergies:</strong>{" "}
                      {ingredient.allergies.category.join(", ")}
                      <a
                        href={ingredient.allergies.ref[0]}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        (More info)
                      </a>
                    </p>
                  )}
                {ingredient.quality_characteristic && (
                  <p className="ingredient-quality">
                    <strong>Quality:</strong>{" "}
                    {ingredient.quality_characteristic}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <hr className="section-divider" />

      {/* Section for instructions */}
      <section className="instructions-section">
        <h2 className="section-headingDetails">Instructions</h2>
        {recipe.instructions.map((instruction, index) => (
          <div key={index} className="instruction-item">
            {/* Original instruction text */}
            <p className="instruction-text">{instruction.original_text}</p>

            {/* Input conditions */}
            {instruction.input_condition &&
              instruction.input_condition.length > 0 && (
                <div className="instruction-conditions">
                  <strong>Input Conditions:</strong>{" "}
                  {instruction.input_condition.join(", ")}
                </div>
              )}

            {/* Task details */}
            {instruction.task && instruction.task.length > 0 && (
              <div className="instruction-task">
                {instruction.task.map((task, taskIndex) => (
                  <div key={taskIndex} className="task-item">
                    <p>
                      <strong>Action:</strong> {task.action_name}
                    </p>

                    {/* Output qualities */}
                    {task.output_quality && task.output_quality.length > 0 && (
                      <p>
                        <strong>Output Quality:</strong>{" "}
                        {task.output_quality.join(". ")}
                      </p>
                    )}

                    {/* Tool information */}
                    {task.background_knowledge &&
                      task.background_knowledge.tool &&
                      task.background_knowledge.tool.length > 0 && (
                        <p>
                          <strong>Tools:</strong>{" "}
                          {task.background_knowledge.tool.join(", ")}
                        </p>
                      )}

                    {/* Failure cases */}
                    {task.background_knowledge &&
                      task.background_knowledge.failure &&
                      task.background_knowledge.failure.length > 0 && (
                        <p className="task-failure">
                          <strong>Potential Failures:</strong>{" "}
                          {task.background_knowledge.failure.join(", ")}
                        </p>
                      )}
                  </div>
                ))}
              </div>
            )}

            {/* Render images if available */}
            {instruction.modality && instruction.modality.image.length > 0 && (
              <div className="instruction-images">
                {instruction.modality.image.map((imgSrc, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={
                      "http://localhost:3001/images/" + getJpgFileName(imgSrc)
                    }
                    alt={`Instruction ${index} step ${imgIndex}`}
                    className="instruction-image"
                  />
                ))}
              </div>
            )}

            {/* Render video if available */}
            {instruction.modality &&
              instruction.modality.video.trim() !== "" && (
                <div className="instruction-video">
                  <video width="320" height="240" controls>
                    <source src={instruction.modality.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}

            {/* Divider */}
            <hr className="section-divider" />
          </div>
        ))}
      </section>

      {/* Section for showing metrics */}
      <section className="metrics-section">
        <button
          className="show-metrics-btn"
          onClick={() => setShowMetrics(!showMetrics)}
        >
          {showMetrics ? "Hide Metrics" : "Show Metrics"}
        </button>
        {showMetrics && <MetricsDisplay metrics={metrics} />}
      </section>
    </div>
  );
};

export default RecipeDetail;
