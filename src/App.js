import { Route, Routes } from "react-router-dom";
//
import NotFound from "./pages/NotFound";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//
import Home from "./pages/Home";
import TheGame from "./pages/TheGame";
import SelectMap from "./pages/SelectMap";
import SelectCharacter from "./pages/SelectCharacter";

function App() {
  return (
    <Container fluid data-bs-theme="dark">
      <Row>
        <Col>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/select-character" element={<SelectCharacter />} />
            <Route path="/select-map" element={<SelectMap />} />
            <Route path="/start-game" element={<TheGame />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
