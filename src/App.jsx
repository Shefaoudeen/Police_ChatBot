import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import Homepage from "./Pages/Homepage";
import BNSdetails from "./Pages/BNSdetails";
import BNSSdetails from "./Pages/BNSSdetails";
import BSAdetails from "./Pages/BSAdetails";
import GetBNSDetails from "./Pages/GetBNSDetails";
import Landing from "./Pages/Landing";
import KnowAll from "./Pages/KnowAll";
import Conversion from "./Pages/Conversion";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="/conversion" element={<Conversion />} />
          <Route path="/bnsDetails" element={<BNSdetails />} />
          <Route path="/bnsDetails/:id" element={<GetBNSDetails />} />
          <Route path="/bnssDetails" element={<BNSSdetails />} />
          <Route path="/bsaDetails" element={<BSAdetails />} />
          <Route path="/knowAll" element={<KnowAll />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
