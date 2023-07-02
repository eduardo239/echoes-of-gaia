import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./css/index.css";
import "./css/game.css";
import { BrowserRouter as Router } from "react-router-dom";
import { PlayerContextProvider } from "./hook/PlayerContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <PlayerContextProvider>
      <Router>
        <App />
      </Router>
    </PlayerContextProvider>
  </React.StrictMode>
);
