import React, { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import publicRouter from '@/Router/PublicRouter';
import Loading from '@/Utils/Loading';
import '@/Sass/_main.scss';


function App() {
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={publicRouter} />
    </Suspense>
  );
}

export default App;

