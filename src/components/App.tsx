import { Container } from "@material-ui/core";
import WeatherInfo from "./WeatherInfo/WeatherInfo";

const styles = {
  app: {
    padding: 15,
    "text-align": "center",
  },
};

const App: React.FC = () => {
  return (
    <Container style={styles.app}>
      <WeatherInfo />
    </Container>
  );
};

export default App;
