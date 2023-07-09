import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import SelectCharacter from "./pages/SelectCharacter";
import TheGame from "./pages2/TheGame";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function App() {
  // const { count, incrementCount, decrementCount } = useContext(PlayerContext);

  return (
    <Container fluid data-bs-theme="dark">
      <Row>
        <Col>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/select-character" element={<SelectCharacter />} />
            <Route path="/start-game" element={<TheGame />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
