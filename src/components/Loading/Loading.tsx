import { CircularProgress } from "@material-ui/core";

const styles = {
  loading: {
    padding: "50px",
  },
};

const Loading: React.FC = () => {
  return <CircularProgress color="secondary" style={styles.loading} />;
};

export default Loading;
