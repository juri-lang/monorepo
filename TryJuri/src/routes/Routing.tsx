import TryOut from './TryOut';
import { Documentation, ReadMe } from './Contents';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function Routing() {
  return <>
    <BrowserRouter>
      <Routes>
        {AppRoutes.jsx}
      </Routes>
    </BrowserRouter>
  </>
}

export const AppRoutes = {
  get routes() {
    return {
      '/': <TryOut />,
      '/documentation': Documentation,
      '/readme': ReadMe
    }
  },

  
  get paths() {
    return Object.keys(this.routes);
  },

  get jsx() {
    return Object.entries(this.routes).map(
      e =>
      <>
        <Route path={e[0]} element={e[1]} />
      </>);
  }
}