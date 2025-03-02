
import { useEffect } from "react";
import Layout from "@/components/common/Layout";
import Hero from "@/components/home/Hero";
import ProjectOverview from "@/components/home/ProjectOverview";
import DatasetHighlight from "@/components/home/DatasetHighlight";
import KeyInsights from "@/components/home/KeyInsights";
import ModelPerformance from "@/components/home/ModelPerformance";
import CallToAction from "@/components/home/CallToAction";

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <Hero />
      <ProjectOverview />
      <DatasetHighlight />
      <KeyInsights />
      <ModelPerformance />
      <CallToAction />
    </Layout>
  );
};

export default Index;
