import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { getCookie } from "react-use-cookie";
import { AuthContext } from "./auth/AuthContextProvider";
import { FooterComponent } from "./components/custom_components/FooterComponent";
import { NavigationBar } from "./components/navbar/NavigationBar";
import { DownloadingPage } from "./pages/DownloadingPage";
import { EditMethodPage } from "./pages/EditMethodPage";
import { LoginPage } from "./pages/LoginPage";
import { MethodDetailsPage } from "./pages/MethodDetailsPage";
import { MyMethodsPage } from "./pages/MyMethodsPage";
import { PresentationPage } from "./pages/PresentationPage";
import { ResultsPage } from "./pages/ResultsPage";
import { SignUpPage } from "./pages/SignUpPage";
import { UploadMethodPage } from "./pages/UploadMethodPage";
import { UserProfilePage } from "./pages/UserProfilePage";

function App() {
  const [user_id, setId] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const cookie_userId = getCookie('user_id');
    const cookie_token = getCookie('token');
    if(cookie_userId && cookie_token) {
      setId(cookie_userId);
      setToken(cookie_token);
    } else {
      document.cookie = "user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
  }, [setId, setToken])

  return (
    <div className="App h-screen flex flex-col justify-between font-roboto">
      <BrowserRouter>
        <AuthContext.Provider value={{ user_id, token, setId, setToken }}>
          <NavigationBar />
          <Routes>
            <Route path="/" element={<PresentationPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/method_details/:methodId" element={<MethodDetailsPage />} />
            <Route path="/upload_method" element={<UploadMethodPage />} />
            <Route path="/my_methods" element={<MyMethodsPage />} />
            <Route path="/edit_method/:methodId" element={<EditMethodPage />} />
            <Route path="/downloading" element={<DownloadingPage />} />
          </Routes>
        </AuthContext.Provider>
      </BrowserRouter>
      <FooterComponent />
    </div>
  );
}

export default App;
