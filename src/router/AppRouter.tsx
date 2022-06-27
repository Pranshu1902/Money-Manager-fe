import { useRoutes } from "raviger";
import Home from "../Home";

const routes = {
  "/": () => <Home />,
};

export default function App() {
  let route = useRoutes(routes);
  return <div>{route}</div>;
}
