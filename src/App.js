import { Route, Routes } from "react-router-dom";
//
import NotFound from "./pages/NotFound";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//
import Home from "./pages/Home";
import SelectMap from "./pages/SelectMap";
import SelectCharacter from "./pages/SelectCharacter";
import CreatePlayer from "./pages/CreatePlayer";
import Game from "./pages/Game";

function App() {
  return (
    <Container fluid data-bs-theme="dark">
      <Row>
        <Col className="game-container bg">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/select-character" element={<SelectCharacter />} />
            <Route path="/create-player" element={<CreatePlayer />} />
            <Route path="/select-map" element={<SelectMap />} />
            <Route path="/start-game" element={<Game />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
