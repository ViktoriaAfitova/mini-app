import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import { HoroscopePage } from '../pages/horoscope';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HoroscopePage />,
    errorElement: <NotFound />,
  },
]);

function Navigator() {
  return <RouterProvider router={router} />;
}

export default Navigator;
