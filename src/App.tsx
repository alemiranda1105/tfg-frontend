import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FooterComponent } from "./components/FooterComponent";
import { NavigationBar } from "./components/NavigationBar";
import { DownloadingPage } from "./pages/DownloadingPage";
import { MethodDetailsPage } from "./pages/MethodDetailsPage";
import { PresentationPage } from "./pages/PresentationPage";
import { ResultsPage } from "./pages/ResultsPage";

function App() {
  return (
    <div className="App h-screen flex flex-col justify-between font-roboto">
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<PresentationPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/method_details/:methodId" element={<MethodDetailsPage />} />
          <Route path="/downloading" element={<DownloadingPage />} />
        </Routes>
      </BrowserRouter>
      <FooterComponent />
    </div>
  );
}

export default App;
