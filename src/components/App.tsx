import { Container, createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import WeatherInfo from "./WeatherInfo/WeatherInfo";

// Or Create your Own theme:
const theme = createMuiTheme({
  palette: {
    secondary: {
      main: "#ff4800",
    },
    background: {
      default: "#262626",
    },
    text: {
      primary: "white",
      secondary: "white",
    },
  },
  typography: {
    body1: {
      color: "white",
    },
  },
});

const styles = {
  app: {
    padding: 15,
    "text-align": "center",
  },
};

const App: React.FC = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Container style={styles.app}>
        <WeatherInfo />
      </Container>
    </MuiThemeProvider>
  );
};

export default App;
