import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import RecipeList from "./components/pages/RecipeList";
import RecipeDetail from "./components/pages/RecipeDetail";
import recipesData from "./data/recipes_representation.json";
import "./styles/MetricsDisplay.css";
import "./styles/RecipeDetail.css";
import "./styles/RecipeList.css";
import "./styles/LoadingSpinner.css";

const App = () => {
  return (
    <div className="main">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to={"/recipes"} />} />
          <Route
            exact
            path="/recipes"
            element={<RecipeList recipes={recipesData["recipe-ids"]} />}
          />
          <Route
            path="/recipes/:recipeName"
            element={<RecipeDetail recipes={recipesData["recipe-ids"]} />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
