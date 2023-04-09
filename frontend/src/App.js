import { Grid } from "@chakra-ui/react";
import "./App.css";
import Navbar from "./Navbar/Navbar";
import AllRoutes from "./Routes/AllRoutes";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Grid mt="90">
        <AllRoutes />
      </Grid>
    </div>
  );
}

export default App;
