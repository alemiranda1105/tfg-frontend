import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { getCookie } from "react-use-cookie";
import { AuthContext } from "./auth/AuthContextProvider";
import { FooterComponent } from "./components/custom_components/FooterComponent";
import { NavigationBar } from "./components/navbar/NavigationBar";
import { ContactPage } from "./pages/ContactPage";
import { DownloadDatasetPage } from "./pages/DownloadDatasetPage";
import { DownloadingPage } from "./pages/DownloadingPage";
import { EditMethodPage } from "./pages/EditMethodPage";
import { FAQPage } from "./pages/FAQPage";
import { LoginPage } from "./pages/LoginPage";
import { MethodDetailsPage } from "./pages/MethodDetailsPage";
import { MyMethodsPage } from "./pages/MyMethodsPage";
import { PresentationPage } from "./pages/PresentationPage";
import { ResultsByFieldPage } from "./pages/ResultsByFieldPage";
import { ResultsByFieldTemplatePage } from "./pages/ResultsByFieldTemplate";
import { ResultsByTemplatePage } from "./pages/ResultsByTemplatePage";
import { ResultsDetailsPage } from "./pages/ResultsDetailsPage";
import { ResultsPage } from "./pages/ResultsPage";
import { SignUpPage } from "./pages/SignUpPage";
import { UpdateUserProfilePage } from "./pages/UpdateUserProfilePage";
import { UploadMethodPage } from "./pages/UploadMethodPage";
import { UserProfilePage } from "./pages/UserProfilePage";

function App() {
  // User data
  const [user_id, setId] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    // only ID and token are saved as cookies
    const cookie_userId = getCookie('user_id');
    const cookie_token = getCookie('token');
    if(cookie_userId && cookie_token) {
      let config = {
        headers: {
            Authorization: `Bearer ${cookie_token}`
        }
      }
      axios.get(`${process.env.REACT_APP_API_URL}/users/${cookie_userId}`, config)
      .then(res => res.data)
      .then(data => {
        setUsername(data.username);
        if(!data.role) {
          setRole("user");
        } else {
          setRole(data.role);
        }
      })
      .catch(error => {
        document.cookie = "user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      });

      setId(cookie_userId);
      setToken(cookie_token);
    } else {
      document.cookie = "user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
    
  }, [token, user_id, username])

  return (
    <div className="App h-screen flex flex-col justify-between font-roboto">
      <BrowserRouter>
        <AuthContext.Provider value={{ user_id, username, token, role, setId, setUsername, setToken, setRole }}>
          <NavigationBar />
          <Routes>
            <Route index element={<PresentationPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/update_user" element={<UpdateUserProfilePage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/method_details/:methodId" element={<MethodDetailsPage />} />
            <Route path="/results_details/:methodId" element={<ResultsDetailsPage />}>
              <Route path="by_template" element={<ResultsByTemplatePage />}/>
              <Route path="by_field_template" element={<ResultsByFieldTemplatePage />}/>
              <Route path="by_field" element={<ResultsByFieldPage />}/>
              <Route index element={<ResultsByTemplatePage />}/>
            </Route>
            <Route path="/upload_method" element={<UploadMethodPage />} />
            <Route path="/my_methods" element={<MyMethodsPage />} />
            <Route path="/edit_method/:methodId" element={<EditMethodPage />} />
            <Route path="/download_dataset" element={<DownloadDatasetPage />} />
            <Route path="/downloading" element={<DownloadingPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FAQPage />} />
          </Routes>
        </AuthContext.Provider>
        <FooterComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;
