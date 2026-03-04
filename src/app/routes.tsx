import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { HomePage } from './components/HomePage';
import { HylaSteamerPage } from './components/HylaSteamerPage';
import { HylaEstPage } from './components/HylaEstPage';
import { ImpressumPage } from './components/ImpressumPage';
import { DatenschutzPage } from './components/DatenschutzPage';
import { NotFoundPage } from './components/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: 'steamer', Component: HylaSteamerPage },
      { path: 'est', Component: HylaEstPage },
      { path: 'impressum', Component: ImpressumPage },
      { path: 'datenschutz', Component: DatenschutzPage },
      { path: '*', Component: NotFoundPage },
    ],
  },
]);