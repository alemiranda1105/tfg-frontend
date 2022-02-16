import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "./auth/AuthContextProvider";
import { FooterComponent } from "./components/FooterComponent";
import { NavigationBar } from "./components/NavigationBar";
import { DownloadingPage } from "./pages/DownloadingPage";
import { MethodDetailsPage } from "./pages/MethodDetailsPage";
import { PresentationPage } from "./pages/PresentationPage";
import { ResultsPage } from "./pages/ResultsPage";
import { SignUpPage } from "./pages/SignUpPage";

function App() {
  const [user_id, setId] = useState("");
  const [token, setToken] = useState("");

  return (
    <div className="App h-screen flex flex-col justify-between font-roboto">
      <BrowserRouter>
        <AuthContext.Provider value={{ user_id, token, setId, setToken }}>
          <NavigationBar />
          <Routes>
            <Route path="/" element={<PresentationPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/method_details/:methodId" element={<MethodDetailsPage />} />
            <Route path="/downloading" element={<DownloadingPage />} />
          </Routes>
        </AuthContext.Provider>
      </BrowserRouter>
      <FooterComponent />
    </div>
  );
}

export default App;
