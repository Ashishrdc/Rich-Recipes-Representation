import React from "react";

const MetricsDisplay = ({ metrics }) => {
  return (
    <div className="metrics-container">
      {/* Completeness */}
      <div className="metric-box">
        <h3 className="metric-title">COMPLETENESS</h3>
        <p>
          <strong>Status:</strong>{" "}
          {metrics.completeness ? "Complete" : "Incomplete"}
        </p>
        <div className="custom-tooltip">
          Checks if all components are present (ingredients, tools, steps)
        </div>
      </div>

      {/* Consistency */}
      <div className="metric-box">
        <h3 className="metric-title">CONSISTENCY</h3>
        <p>
          <strong>Status:</strong>{" "}
          {metrics.consistency ? "Consistent" : "Inconsistent"}
        </p>
        <div className="custom-tooltip">
          Ensures logical coherence between ingredients, tools, and steps
        </div>
      </div>

      {/* Cohesion */}
      <div className="metric-box">
        <h3 className="metric-title">COHESION</h3>
        <p>
          <strong>Status:</strong>{" "}
          {metrics.cohesion ? "Cohesive" : "Not Cohesive"}
        </p>
        <div className="custom-tooltip">
          Ensures all tools and ingredients are appropriately associated with
          actions/steps
        </div>
      </div>

      {/* Action Coverage */}
      <div className="metric-box">
        <h3 className="metric-title">ACTION COVERAGE</h3>
        <p>
          <strong>Common Actions:</strong>{" "}
          {metrics.actionCoverage.hasCommonActions ? "Yes" : "No"}
        </p>
        <p>
          <strong>Unique Actions:</strong>{" "}
          {metrics.actionCoverage.uniqueActions.join(", ")}
        </p>
        <div className="custom-tooltip">
          Counts unique actions and common actions like 'boil', 'chop'
        </div>
      </div>

      {/* Ingredient Utilization */}
      <div className="metric-box">
        <h3 className="metric-title">INGREDIENT UTILIZATION</h3>
        <p>
          <strong>All Ingredients Used:</strong>{" "}
          {metrics.ingredientUtilization.allUsed ? "Yes" : "No"}
        </p>
        <p>
          <strong>Used Ingredients:</strong>{" "}
          {metrics.ingredientUtilization.usedIngredients.join(", ")}
        </p>
        <div className="custom-tooltip">
          Checks if all listed ingredients are used
        </div>
      </div>

      {/* Step Granularity */}
      <div className="metric-box">
        <h3 className="metric-title">STEP GRANULARITY</h3>
        <p>
          <strong>Number of Steps:</strong>{" "}
          {metrics.stepGranularity.numberOfSteps}
        </p>
        <p>
          <strong>Granularity:</strong> {metrics.stepGranularity.granularity}
        </p>
        <div className="custom-tooltip">
          Measures the number of instructions and evaluates them
        </div>
      </div>

      {/* Efficiency */}
      <div className="metric-box">
        <h3 className="metric-title">EFFICIENCY</h3>
        <p>
          <strong>Redundant Steps:</strong>{" "}
          {metrics.efficiency.redundantSteps.length > 0
            ? metrics.efficiency.redundantSteps.join(", ")
            : "None"}
        </p>
        <p>
          <strong>Tools Used:</strong> {metrics.efficiency.toolSet.join(", ")}
        </p>
        <div className="custom-tooltip">Looks for redundant steps or tools</div>
      </div>

      {/* Readability */}
      <div className="metric-box">
        <h3 className="metric-title">READABILITY</h3>
        <p>
          <strong>Average Sentence Length:</strong>{" "}
          {metrics.readability.avgSentenceLength}
        </p>
        <p>
          <strong>Readable:</strong>{" "}
          {metrics.readability.readable ? "Yes" : "No"}
        </p>
        <div className="custom-tooltip">
          Measures readability based on sentence length and step count
        </div>
      </div>

      {/* Complexity */}
      <div className="metric-box">
        <h3 className="metric-title">COMPLEXITY</h3>
        <p>
          <strong>Ingredients:</strong> {metrics.complexity.numIngredients}
        </p>
        <p>
          <strong>Steps:</strong> {metrics.complexity.numSteps}
        </p>
        <p>
          <strong>Tools:</strong> {metrics.complexity.numTools}
        </p>
        <p>
          <strong>Complexity:</strong> {metrics.complexity.complexityLevel}
        </p>
        <div className="custom-tooltip">
          Evaluates complexity based on ingredients, steps, and tools
        </div>
      </div>
    </div>
  );
};

export default MetricsDisplay;
