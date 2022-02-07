import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FooterComponent } from "./components/FooterComponent";
import { NavigationBar } from "./components/NavigationBar";
import { DownloadingPage } from "./pages/DownloadingPage";
import { PresentationPage } from "./pages/PresentationPage";
import { ResultsPage } from "./pages/ResultsPage";

function App() {
  return (
    <div className="App font-roboto">
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<PresentationPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/downloading" element={<DownloadingPage />} />
        </Routes>
      </BrowserRouter>
      <FooterComponent />
    </div>
  );
}

export default App;
