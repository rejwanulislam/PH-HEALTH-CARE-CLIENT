import app from "./app";
import { envVars } from "./config/env";

const port = envVars.PORT; // The port your express server will be running on.



const bootstrap = async () => {
  try {
    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });

  } catch (error) {
    console.log("server error", error)
  }
}
bootstrap()