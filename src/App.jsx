import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import GetSectionDetails from "./Pages/GetSectionDetails";
import Landing from "./Pages/Landing";
import KnowAll from "./Pages/KnowAll";
import Conversion from "./Pages/Conversion";
import InteractiveSession from "./Pages/InteractiveSession";
import Conversion2 from "./Pages/Conversion2";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />

          <Route path="/conversion1" element={<Conversion />} />

          <Route path="/conversion" element={<Conversion2 />} />
          <Route path="/interactive" element={<InteractiveSession />} />
          <Route path="/knowAll" element={<KnowAll />} />
          <Route path="/knowAllDetail/:id" element={<GetSectionDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
