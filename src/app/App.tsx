import { LoggedUserProvider } from "./shared/context";
import { Routes } from "./routes"

export const App = () => {
  return (
    <LoggedUserProvider>
      <Routes />
    </LoggedUserProvider>
  );
}

