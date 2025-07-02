import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router";

import MainLayout from "./layouts/MainLayout";
import NotFoundPage from "./pages/NotFoundPage";
import Stepper from "./layouts/Stepper";
import { WebSocketProvider } from "./contexts/WebSocketContext";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Stepper />}></Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return (
    <WebSocketProvider>
      <RouterProvider router={router} />
    </WebSocketProvider>
  );
};

export default App;
