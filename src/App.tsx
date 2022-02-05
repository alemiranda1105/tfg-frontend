import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FooterComponent } from "./components/FooterComponent";
import { DownloadingPage } from "./pages/DownloadingPage";
import { PresentationPage } from "./pages/PresentationPage";

function App() {
  return (
    <div className="App font-roboto">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PresentationPage />} />
          <Route path="/downloading" element={<DownloadingPage />} />
        </Routes>
      </BrowserRouter>
      <FooterComponent />
    </div>
  );
}

export default App;
