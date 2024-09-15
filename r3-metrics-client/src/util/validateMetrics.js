// All the metrics for the recipes ->
// Completeness: Checks if all components are present (ingredients, tools, steps)
const checkCompleteness = (recipe) => {
  const hasIngredients = recipe.ingredients && recipe.ingredients.length > 0;
  const hasTools = recipe.instructions.some((instruction) =>
    instruction.task.some((task) => task.background_knowledge.tool.length > 0)
  );
  const hasSteps = recipe.instructions && recipe.instructions.length > 0;
  return hasIngredients && hasTools && hasSteps;
};

// Consistency: Ensures logical coherence between ingredients, tools, and steps
const checkConsistency = (recipe) => {
  // Create a Set of ingredient names (lowercased) for easy lookup
  const ingredientsSet = new Set(
    recipe.ingredients.map((ing) => ing.name.toLowerCase())
  );

  let consistent = true;

  // Check if all tools mentioned in the instructions are present in the recipe's ingredients
  recipe.instructions.forEach((instruction) => {
    instruction.task.forEach((task) => {
      task.background_knowledge.tool.forEach((tool) => {
        // Check if the tool is not listed as an ingredient
        if (tool && !ingredientsSet.has(tool.toLowerCase())) {
          consistent = false;
        }
      });
    });
  });

  return consistent;
};

// Cohesion: Ensures all tools and ingredients are appropriately associated with actions/steps
const checkCohesion = (recipe) => {
  const toolsSet = new Set();
  recipe.instructions.forEach((instruction) => {
    instruction.task.forEach((task) => {
      task.background_knowledge.tool.forEach((tool) => toolsSet.add(tool));
    });
  });
  return toolsSet.size > 0;
};

// Action Coverage: Counts unique actions and common actions like "boil", "chop"
const checkActionCoverage = (recipe) => {
  const commonActions = ["boil", "chop", "mix", "fry", "bake"];
  const uniqueActions = new Set();
  recipe.instructions.forEach((instruction) => {
    instruction.task.forEach((task) =>
      uniqueActions.add(task.action_name.toLowerCase())
    );
  });
  const hasCommonActions = commonActions.some((action) =>
    uniqueActions.has(action)
  );
  return { uniqueActions: Array.from(uniqueActions), hasCommonActions };
};

// Ingredient Utilization: Checks if all listed ingredients are used
const checkIngredientUtilization = (recipe) => {
  const usedIngredients = new Set();
  recipe.instructions.forEach((instruction) => {
    instruction.task.forEach((task) => {
      recipe.ingredients.forEach((ingredient) => {
        if (
          task.action_name.toLowerCase().includes(ingredient.name.toLowerCase())
        ) {
          usedIngredients.add(ingredient.name.toLowerCase());
        }
      });
    });
  });
  const allUsed = recipe.ingredients.every((ing) =>
    usedIngredients.has(ing.name.toLowerCase())
  );
  return { usedIngredients: Array.from(usedIngredients), allUsed };
};

// Step Granularity: Measures the number of instructions and evaluates them
const checkStepGranularity = (recipe) => {
  const numberOfSteps = recipe.instructions.length;
  const granularity =
    numberOfSteps >= 3 && numberOfSteps <= 10
      ? "appropriate"
      : "too detailed or too vague";
  return { numberOfSteps, granularity };
};

// Efficiency: Looks for redundant steps or tools
const checkEfficiency = (recipe) => {
  const toolSet = new Set();
  const redundantSteps = [];
  recipe.instructions.forEach((instruction) => {
    instruction.task.forEach((task) => {
      if (toolSet.has(task.action_name)) {
        redundantSteps.push(task.action_name);
      } else {
        toolSet.add(task.action_name);
      }
    });
  });
  return { redundantSteps, toolSet: Array.from(toolSet) };
};

// Readability: Measures readability based on sentence length and step count
const checkReadability = (recipe) => {
  const sentenceLengths = recipe.instructions.map(
    (instruction) => instruction.original_text.split(" ").length
  );
  const avgSentenceLength =
    sentenceLengths.reduce((a, b) => a + b, 0) / sentenceLengths.length;
  const readable = avgSentenceLength < 20 && recipe.instructions.length <= 10;
  return { avgSentenceLength, readable };
};

// Complexity: Evaluates complexity based on ingredients, steps, and tools
const checkComplexity = (recipe) => {
  const numIngredients = recipe.ingredients.length;
  const numSteps = recipe.instructions.length;
  const numTools = new Set();
  recipe.instructions.forEach((instruction) => {
    instruction.task.forEach((task) => {
      task.background_knowledge.tool.forEach((tool) => numTools.add(tool));
    });
  });
  const complexityLevel =
    numIngredients + numSteps + numTools.size > 20 ? "complex" : "simple";
  return { numIngredients, numSteps, numTools: numTools.size, complexityLevel };
};

// Wrapper function to calculate all metrics
export const calculateMetrics = (recipe) => {
  return {
    completeness: checkCompleteness(recipe),
    consistency: checkConsistency(recipe),
    cohesion: checkCohesion(recipe),
    actionCoverage: checkActionCoverage(recipe),
    ingredientUtilization: checkIngredientUtilization(recipe),
    stepGranularity: checkStepGranularity(recipe),
    efficiency: checkEfficiency(recipe),
    readability: checkReadability(recipe),
    complexity: checkComplexity(recipe),
  };
};
