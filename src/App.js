import "./App.css";

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CampaignPage from "./pages/CampaignPage"
import PageNotFound from "./pages/PageNotFound";
import FAQ from "./pages/FAQ"
import Layout from "./components/Layout"
import About from "./pages/About";
import Contact from "./pages/Contact";
import Test from "./pages/Test";
import BuyCrypto from "./pages/BuyCrypto";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes  */}
          <Route index element={<Home />} />
          <Route path="/campaign/:id/" element={<CampaignPage />} />
          <Route path="/campaign/" element={<CampaignPage />} />
          <Route path="/faq/" element={<FAQ />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/test" element={<Test />} />
          <Route path="/buy" element={<BuyCrypto />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
