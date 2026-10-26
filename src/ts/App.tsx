import { BrowserRouter, Route, Routes } from 'react-router'
import '../tools/css/reset.css'
import '../tools/css/page.css'
import Layout from '../tools/components/Layout'
import Home from '../tools/pages/Home'
import Chess1 from '../tools/pages/Chess1'
import Chess2 from '../tools/pages/Chess2'
import Analysis from '../tools/pages/Analysis'
import Online from '../tools/pages/Online'
import NotFound from '../tools/pages/NotFound'

// add a page: create it in tools/pages, add a <Route> here and an item in Menu.tsx
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="chess-1" element={<Chess1 />} />
          <Route path="chess-2" element={<Chess2 />} />
          <Route path="chess-analysis" element={<Analysis />} />
          <Route path="chess-online" element={<Online />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
