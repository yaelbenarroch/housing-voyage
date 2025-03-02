
import { motion } from "framer-motion";
import Layout from "@/components/common/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, ScatterChart, Scatter, ZAxis } from 'recharts';

const featureImportanceData = [
  { feature: "GrLivArea", importance: 0.287 },
  { feature: "OverallQual", importance: 0.192 },
  { feature: "GarageCars", importance: 0.098 },
  { feature: "YearBuilt", importance: 0.087 },
  { feature: "TotalBsmtSF", importance: 0.082 },
  { feature: "1stFlrSF", importance: 0.065 },
  { feature: "FullBath", importance: 0.041 },
  { feature: "LotArea", importance: 0.038 },
  { feature: "TotRmsAbvGrd", importance: 0.033 },
  { feature: "GarageArea", importance: 0.029 }
];

const modelComparisonData = [
  { model: "Linear Regression", accuracy: 0.73, rmse: 42103, interpretability: 0.9 },
  { model: "Random Forest", accuracy: 0.87, rmse: 31245, interpretability: 0.5 },
  { model: "Gradient Boosting", accuracy: 0.89, rmse: 29876, interpretability: 0.4 },
  { model: "XGBoost", accuracy: 0.91, rmse: 27498, interpretability: 0.3 },
  { model: "Neural Network", accuracy: 0.85, rmse: 32567, interpretability: 0.1 }
];

const Model = () => {
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container px-4 md:px-6 py-8"
      >
        <h1 className="text-3xl font-bold mb-6">Model Insights</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Feature Importance</CardTitle>
              <CardDescription>
                The most influential features in our housing price prediction model
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={featureImportanceData}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 90, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 0.3]} tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
                  <YAxis type="category" dataKey="feature" width={80} />
                  <Tooltip formatter={(value) => `${(value * 100).toFixed(1)}%`} />
                  <Legend />
                  <Bar dataKey="importance" fill="#8884d8" name="Importance" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Model Comparison</CardTitle>
              <CardDescription>
                Performance metrics across different modeling approaches
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={modelComparisonData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="model" angle={-45} textAnchor="end" height={60} />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" domain={[0, 1]} tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" domain={[0, 50000]} />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="accuracy" fill="#8884d8" name="Accuracy" />
                  <Bar yAxisId="right" dataKey="rmse" fill="#82ca9d" name="RMSE" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>SHAP Value Analysis</CardTitle>
            <CardDescription>
              SHapley Additive exPlanations (SHAP) values showing the impact of features on model predictions
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="flex justify-center py-4">
              <img 
                src="https://raw.githubusercontent.com/CodingJake/DataVoyage/main/images/shap_summary.png" 
                alt="SHAP Values Summary Plot" 
                className="max-w-full h-auto rounded-lg shadow-lg" 
              />
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              The SHAP summary plot shows how each feature affects the model output. Features are ordered by their importance, 
              with red points indicating higher values and blue indicating lower values. The horizontal spread shows the impact 
              magnitude on the prediction.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Decision Tree Visualization</CardTitle>
            <CardDescription>
              A simplified view of the decision tree model's logic
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="flex justify-center py-4">
              <img 
                src="https://raw.githubusercontent.com/CodingJake/DataVoyage/main/images/decision_tree.png" 
                alt="Decision Tree Visualization" 
                className="max-w-full h-auto rounded-lg shadow-lg" 
              />
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              This visualization shows a pruned decision tree, demonstrating how the model splits based on feature values to 
              make predictions. Each node shows the split feature, threshold, samples, and mean price value.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </Layout>
  );
};

export default Model;
