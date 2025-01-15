import {
  ChannelDetails,
  Feed,
  SearchFeed,
  Sidebar,
  VideoDetails,
  Navbar,
} from "./pages/index";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-black text-white">
        <Sidebar />
        <div className="flex-1 ml-[64px]">
          <Navbar />
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/feed/:id" element={<Feed />} />
            <Route path="/channel/:id" element={<ChannelDetails />} />
            <Route path="/search/:id" element={<SearchFeed />} />
            <Route path="/watch/:id" element={<VideoDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
