import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import List from './pages/List';
import InputData from './pages/InputData';
import Login from './pages/Login';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      children: [
        {
          index: true,
          element: <InputData />,
        },
        {
          path: '/data',
          element: <List />,
        },
      ],
    },
    {
      path: '/login',
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
