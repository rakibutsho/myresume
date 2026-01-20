import Home from "@/components/home/Home";
import Education from "@/components/modules/Education/Education";
import Tools from "@/components/modules/Tools/Tools";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <Home />
      <Tools />
      <Education />
    </div>
  );
};

export default HomePage;
