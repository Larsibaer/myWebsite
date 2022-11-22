import React from "react";
import "./styles.css";
import { Chrono } from "react-chrono";
import data from "./data";

export default function App() {
  return (
    <div className="App">
      <div style={{ width: "100%", height: "90vh" }}>
        <Chrono
          items={data}
          mode="VERTICAL"
          slideShow
          slideItemDuration={4000}
          cardHeight={150}
        />
      </div>
    </div>
  );
}
