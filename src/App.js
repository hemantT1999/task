import React from "react";
import FormBuilder from "./components/FormBuilder.jsx";
import SearchableTable from "./components/SearchableTable.jsx";
import AnimatedBox from "./components/AnimatedBox.jsx";
import "./styles/styles.css";

const App = () => {
  return (
    <div className="container">
      <h1>Task</h1>
      <FormBuilder />
      <SearchableTable />
      <AnimatedBox />
    </div>
  );
};

export default App;
