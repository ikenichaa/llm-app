import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router";

import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/UploadStep";
import NotFoundPage from "./pages/NotFoundPage";
import Stepper from "./layouts/Stepper";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />}></Route>
        <Route path="/stepper" element={<Stepper />}></Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
