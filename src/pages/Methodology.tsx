
import { motion } from "framer-motion";
import Layout from "@/components/common/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Methodology = () => {
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container px-4 md:px-6 py-8"
      >
        <h1 className="text-3xl font-bold mb-6">Methodology</h1>
        
        <Tabs defaultValue="data" className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="data">Data Preparation</TabsTrigger>
            <TabsTrigger value="features">Feature Engineering</TabsTrigger>
            <TabsTrigger value="models">Model Development</TabsTrigger>
            <TabsTrigger value="evaluation">Evaluation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="data" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Data Collection & Preprocessing</CardTitle>
                <CardDescription>
                  How we prepared the Ames Housing dataset for analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="text-lg font-semibold">Dataset Overview</h3>
                <p>
                  The Ames Housing dataset contains detailed information on 2,930 properties in Ames, 
                  Iowa, with 79 explanatory variables describing aspects of residential homes. The dataset 
                  includes both numerical variables (such as square footage) and categorical variables 
                  (like neighborhood and house style).
                </p>
                
                <h3 className="text-lg font-semibold">Preprocessing Steps</h3>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>
                    <strong>Missing Value Treatment:</strong> We identified and addressed missing values using 
                    domain-appropriate methods. Categorical variables were imputed with the mode, while numerical 
                    variables were imputed with the median (for skewed distributions) or mean (for normal distributions).
                  </li>
                  <li>
                    <strong>Outlier Detection:</strong> We used box plots and the IQR method to identify outliers in 
                    numerical features, particularly in price and square footage variables. Extreme outliers were 
                    either removed or capped depending on the variable's distribution.
                  </li>
                  <li>
                    <strong>Data Transformation:</strong> Skewed numerical features were transformed using log 
                    transformations to improve model performance, which is particularly important for variables 
                    like lot size and sale price.
                  </li>
                  <li>
                    <strong>Categorical Encoding:</strong> Categorical variables were encoded using appropriate 
                    techniques - one-hot encoding for nominal variables and ordinal encoding for ordered categories.
                  </li>
                </ol>
                
                <h3 className="text-lg font-semibold">Data Validation</h3>
                <p>
                  We implemented a 80/20 train-test split stratified by neighborhood and price range to ensure 
                  representative distributions. The training data was further split using 5-fold cross-validation 
                  during model development to provide robust performance estimates.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="features" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Feature Engineering & Selection</CardTitle>
                <CardDescription>
                  Creating meaningful features to improve model performance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="text-lg font-semibold">Engineered Features</h3>
                <p>
                  We developed several composite features that capture important aspects of the properties:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Total Square Footage:</strong> Combined above-ground and basement living areas to create a 
                    comprehensive size metric.
                  </li>
                  <li>
                    <strong>Age at Sale:</strong> Calculated from YearBuilt and YrSold to quantify property age.
                  </li>
                  <li>
                    <strong>Remodel Age:</strong> Derived from YearRemodAdd and YrSold to capture renovation recency.
                  </li>
                  <li>
                    <strong>Quality-Size Interaction:</strong> Created interaction terms between overall quality and 
                    square footage to capture how quality effects scale with size.
                  </li>
                  <li>
                    <strong>Neighborhood Price Index:</strong> Developed a normalized index of neighborhood desirability 
                    based on historical prices.
                  </li>
                </ul>
                
                <h3 className="text-lg font-semibold">Feature Selection</h3>
                <p>
                  From the original 79 variables plus engineered features, we used a multi-stage selection process:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Correlation Analysis:</strong> Identified and addressed multicollinearity using VIF 
                    (Variance Inflation Factor) and correlation matrices.
                  </li>
                  <li>
                    <strong>Feature Importance:</strong> Utilized Random Forest and LASSO regression to rank features 
                    by importance, keeping the top 25 most influential predictors.
                  </li>
                  <li>
                    <strong>Recursive Feature Elimination:</strong> Applied RFE with cross-validation to determine the 
                    optimal feature subset that maximizes predictive performance.
                  </li>
                </ul>
                
                <h3 className="text-lg font-semibold">Dimensionality Reduction</h3>
                <p>
                  For certain models, we applied PCA (Principal Component Analysis) to transform correlated features 
                  into uncorrelated components while preserving 95% of the variance, which improved model stability 
                  and reduced overfitting.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="models" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Model Development</CardTitle>
                <CardDescription>
                  The algorithms and techniques used in our prediction pipeline
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="text-lg font-semibold">Model Selection</h3>
                <p>
                  We evaluated multiple regression models to predict housing prices:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Linear Models:</strong> Multiple Linear Regression and Ridge Regression to establish baseline 
                    performance and handle multicollinearity.
                  </li>
                  <li>
                    <strong>Tree-Based Models:</strong> Random Forest and Gradient Boosting for capturing non-linear 
                    relationships and interactions between features.
                  </li>
                  <li>
                    <strong>Advanced Ensemble:</strong> XGBoost as our primary model, which combines multiple decision 
                    trees with gradient boosting to maximize predictive accuracy.
                  </li>
                  <li>
                    <strong>Neural Network:</strong> A multi-layer perceptron with appropriate regularization to capture 
                    complex patterns in the data.
                  </li>
                </ul>
                
                <h3 className="text-lg font-semibold">Hyperparameter Tuning</h3>
                <p>
                  For each model type, we conducted extensive hyperparameter optimization:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Grid Search:</strong> For models with fewer parameters, we performed exhaustive grid search 
                    with cross-validation.
                  </li>
                  <li>
                    <strong>Bayesian Optimization:</strong> For XGBoost and neural networks, we used Bayesian optimization 
                    to efficiently search the hyperparameter space.
                  </li>
                </ul>
                
                <h3 className="text-lg font-semibold">Ensemble Method</h3>
                <p>
                  Our final prediction model employs a stacked ensemble approach, combining predictions from multiple 
                  base models:
                </p>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>
                    <strong>Level 1 Models:</strong> XGBoost, Random Forest, and Ridge Regression as diverse base learners.
                  </li>
                  <li>
                    <strong>Level 2 Model:</strong> A meta-learner (Lasso Regression) that combines the predictions from 
                    Level 1 models to produce the final output.
                  </li>
                </ol>
                <p>
                  This stacked approach leverages the strengths of different algorithms and provides a more robust prediction 
                  than any single model alone.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="evaluation" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Model Evaluation & Validation</CardTitle>
                <CardDescription>
                  How we assessed model performance and ensured reliability
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="text-lg font-semibold">Performance Metrics</h3>
                <p>
                  We evaluated our models using multiple metrics to provide a comprehensive assessment:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Root Mean Squared Error (RMSE):</strong> Our primary metric, which penalizes larger errors more 
                    heavily, important for a prediction task where the cost of large mistakes is high.
                  </li>
                  <li>
                    <strong>Mean Absolute Error (MAE):</strong> Used to understand the average magnitude of errors in dollar 
                    terms, providing a more interpretable metric.
                  </li>
                  <li>
                    <strong>R-squared (R²):</strong> To measure the proportion of variance in prices explained by our model.
                  </li>
                  <li>
                    <strong>Mean Absolute Percentage Error (MAPE):</strong> To understand errors in percentage terms, 
                    which is useful for comparing prediction accuracy across different price ranges.
                  </li>
                </ul>
                
                <h3 className="text-lg font-semibold">Validation Strategy</h3>
                <p>
                  To ensure the robustness of our model evaluation:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Cross-Validation:</strong> Used 5-fold cross-validation on the training set to assess model 
                    stability and prevent overfitting.
                  </li>
                  <li>
                    <strong>Temporal Validation:</strong> Created a time-based split to validate that the model performs 
                    well on more recent data, simulating how it would be used in practice.
                  </li>
                  <li>
                    <strong>Subgroup Analysis:</strong> Evaluated performance across different neighborhoods and price 
                    ranges to ensure consistent accuracy across all segments.
                  </li>
                </ul>
                
                <h3 className="text-lg font-semibold">Error Analysis</h3>
                <p>
                  We conducted detailed error analysis to understand model limitations:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Residual Plots:</strong> Examined patterns in prediction errors to identify potential biases 
                    or areas for improvement.
                  </li>
                  <li>
                    <strong>Feature Importance:</strong> Used SHAP values to understand which features contribute most 
                    to accurate predictions and which might be causing errors.
                  </li>
                  <li>
                    <strong>Case Studies:</strong> Analyzed properties with the largest prediction errors to identify 
                    common characteristics and edge cases.
                  </li>
                </ul>
                
                <h3 className="text-lg font-semibold">Production Deployment</h3>
                <p>
                  Our final evaluation included practical considerations for deployment:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Model Size and Speed:</strong> Balanced prediction accuracy with model complexity to ensure 
                    efficient deployment.
                  </li>
                  <li>
                    <strong>Feature Availability:</strong> Ensured that all required features would be available at prediction 
                    time in real-world scenarios.
                  </li>
                  <li>
                    <strong>Monitoring Plan:</strong> Established key metrics to track for model performance degradation over 
                    time, with an automated retraining pipeline.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <Card>
          <CardHeader>
            <CardTitle>Technical Implementation</CardTitle>
            <CardDescription>
              Tools and technologies used in this project
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Data Processing</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Python</li>
                  <li>Pandas</li>
                  <li>NumPy</li>
                  <li>SciPy</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Machine Learning</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Scikit-learn</li>
                  <li>XGBoost</li>
                  <li>TensorFlow/Keras</li>
                  <li>SHAP</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Visualization & Frontend</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Matplotlib</li>
                  <li>Seaborn</li>
                  <li>React</li>
                  <li>Recharts</li>
                  <li>Tailwind CSS</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Project Repository</h3>
              <p>
                The complete code for this project, including data preprocessing, model training, and 
                evaluation scripts, is available on GitHub:
              </p>
              <div className="mt-2">
                <a 
                  href="https://github.com/CodingJake/DataVoyage" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-primary/10 text-primary hover:bg-primary/20 px-4 py-2 rounded-md transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                  <span>DataVoyage Repository</span>
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Layout>
  );
};

export default Methodology;
