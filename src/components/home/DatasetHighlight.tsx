
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const stats = [
  { label: "Dataset Size", value: "1,460" },
  { label: "Features", value: "79" },
  { label: "Target Variable", value: "Sale Price" },
  { label: "ML Models", value: "3" },
  { label: "Best R² Score", value: "0.916" },
  { label: "RMSE", value: "$21,935" },
];

const DatasetHighlight = () => {
  return (
    <section className="py-24 bg-accent/50">
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
              The Ames Housing Dataset
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="max-w-[700px] mx-auto text-muted-foreground"
            >
              A comprehensive housing dataset from Ames, Iowa with detailed property attributes,
              perfect for demonstrating advanced regression techniques.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 * index }}
              >
                <Card className={cn(
                  "h-full border-none",
                  index === 4 ? "bg-primary text-primary-foreground" : "bg-card"
                )}>
                  <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                    <p className={cn(
                      "text-3xl font-bold",
                      index === 4 ? "text-primary-foreground" : "text-primary"
                    )}>
                      {stat.value}
                    </p>
                    <p className={cn(
                      "text-sm mt-1",
                      index === 4 ? "text-primary-foreground/80" : "text-muted-foreground"
                    )}>
                      {stat.label}
                    </p>
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

export default DatasetHighlight;
