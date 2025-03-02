
import { motion } from "framer-motion";
import { LineChart, BarChart, PieChart, Share2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: <LineChart className="h-8 w-8 text-primary" />,
    title: "Advanced Regression",
    description: "Using gradient boosting and ensemble methods to improve prediction accuracy"
  },
  {
    icon: <BarChart className="h-8 w-8 text-primary" />,
    title: "Feature Engineering",
    description: "Creating meaningful features from raw data to enhance model performance"
  },
  {
    icon: <PieChart className="h-8 w-8 text-primary" />,
    title: "Model Explainability",
    description: "Understanding predictions with SHAP values and feature importance"
  },
  {
    icon: <Share2 className="h-8 w-8 text-primary" />,
    title: "Interactive Exploration",
    description: "Dynamic visualizations allowing exploration of data relationships"
  }
];

const ProjectOverview = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid gap-12">
          <div className="space-y-4 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
            >
              Project Overview
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="max-w-[700px] mx-auto text-muted-foreground"
            >
              This project demonstrates advanced machine learning techniques applied to housing price prediction,
              with a focus on feature engineering and model explainability.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="mb-2">{feature.icon}</div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-foreground/70">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectOverview;
