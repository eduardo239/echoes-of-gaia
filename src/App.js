import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import SelectCharacter from "./pages/SelectCharacter";
import StartGame from "./pages/StartGame";

function App() {
  // const { count, incrementCount, decrementCount } = useContext(PlayerContext);

  return (
    <div className="p-3">
      <h1>Echoes of Gaia</h1>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/select-character" element={<SelectCharacter />} />
        <Route path="/start-game" element={<StartGame />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
