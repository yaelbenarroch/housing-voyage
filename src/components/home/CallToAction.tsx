
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FileText, LineChart, Code } from "lucide-react";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="py-24 bg-primary/5 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-25">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f605_1px,transparent_1px),linear-gradient(to_bottom,#3b82f605_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid gap-12">
          <div className="space-y-4 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
            >
              Ready to Dive Deeper?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="max-w-[700px] mx-auto text-muted-foreground"
            >
              Explore the different aspects of this machine learning project
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Link to="/explorer">
                <Button 
                  variant="outline" 
                  className="w-full h-24 flex flex-col items-center justify-center gap-2 rounded-xl border-2 transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary"
                >
                  <LineChart className="h-6 w-6" />
                  <span>Data Explorer</span>
                </Button>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link to="/model">
                <Button 
                  variant="outline" 
                  className="w-full h-24 flex flex-col items-center justify-center gap-2 rounded-xl border-2 transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary"
                >
                  <Code className="h-6 w-6" />
                  <span>Model Insights</span>
                </Button>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link to="/methodology">
                <Button 
                  variant="outline" 
                  className="w-full h-24 flex flex-col items-center justify-center gap-2 rounded-xl border-2 transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary"
                >
                  <FileText className="h-6 w-6" />
                  <span>Methodology</span>
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
