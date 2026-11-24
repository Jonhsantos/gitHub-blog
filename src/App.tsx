import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { PostDetail } from './pages/PostDetail';
import { NotFound } from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter basename="/gitHub-blog">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:number" element={<PostDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
