
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, LineChart, PieChart } from "lucide-react";

const KeyInsights = () => {
  const insights = [
    {
      title: "Overall Quality Matters Most",
      description: "Overall property quality is the single most influential feature in determining housing prices in this dataset",
      icon: <BarChart3 className="h-8 w-8 text-primary" />,
    },
    {
      title: "Size and Location",
      description: "After quality, total living area and neighborhood are the next most important predictors of housing value",
      icon: <PieChart className="h-8 w-8 text-primary" />,
    },
    {
      title: "Feature Interaction",
      description: "Combining quality ratings with size metrics creates powerful interaction features that improve prediction accuracy",
      icon: <LineChart className="h-8 w-8 text-primary" />,
    },
  ];

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
              Key Insights
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="max-w-[700px] mx-auto text-muted-foreground"
            >
              Discoveries and patterns revealed through our analysis and modeling process
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {insights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="mb-2">{insight.icon}</div>
                    <CardTitle>{insight.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-foreground/70">
                      {insight.description}
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

export default KeyInsights;
