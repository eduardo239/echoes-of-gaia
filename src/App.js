import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import SelectCharacter from "./pages/SelectCharacter";
import TheGame from "./pages2/TheGame";

function App() {
  // const { count, incrementCount, decrementCount } = useContext(PlayerContext);

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/select-character" element={<SelectCharacter />} />
        <Route path="/start-game" element={<TheGame />} />
        {/* <Route path="/start-game" element={<StartGame />} /> */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
