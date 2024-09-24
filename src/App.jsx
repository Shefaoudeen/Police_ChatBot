import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import Homepage from "./Pages/Homepage";
import BNSdetails from "./Pages/BNSdetails";
import BNSSdetails from "./Pages/BNSSdetails";
import BSAdetails from "./Pages/BSAdetails";
import GetBNSDetails from "./Pages/GetBNSDetails";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="/bnsDetails" element={<BNSdetails />} />
          <Route path="/bnsDetails/:id" element={<GetBNSDetails />} />
          <Route path="/bnssDetails" element={<BNSSdetails />} />
          <Route path="/bsaDetails" element={<BSAdetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
