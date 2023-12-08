import "dotenv/config";
import App from "@/main/config/app";

const port = (process.env.PORT as unknown as number) || 8080;

App.start(port, () => {
  console.log(`Listen in port: ${port}`);
});
