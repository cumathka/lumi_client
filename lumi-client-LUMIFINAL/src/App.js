import React,{ useEffect,useState } from 'react';
import {Routes, Route } from 'react-router-dom'
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import MainMenu from './pages/MainMenu';
import CreateQuiz from './pages/CreateQuiz';
import UserSettings from './pages/UserSettings';
import Navbar from './components/NavBar';
import About from './pages/About';
import ComingSoon from './pages/ComingSoon'
import * as userService from "./service/user.service";
import { useAuth0 } from '@auth0/auth0-react';
import BrowsePage from './pages/BrowsePage';
import Quiz from './pages/Quiz';
import { useTranslation } from 'react-i18next';
import EditQuiz from './pages/EditQuiz';
import PageNotFound from './pages/PageNotFound';
const theme = createTheme({
  palette: {
    primary: {
      main: "#e9723d",
    },
    secondary: {
      main: "#fcb603",
    },
  },
});
const App = () => {
  const {i18n} = useTranslation();
  const [userIdUserDB, setUserIdUserDB] = useState()
  const {
    user,
    isAuthenticated,
    // loginWithRedirect,
    // logout,
  } = useAuth0();
  // const logoutWithRedirect = () =>
  // logout({
  //   returnTo: window.location.origin,
  // });
  useEffect(() => {
    const checkUser = async (pUser) => {
      const status = await userService.checkAuthenticatedUser(pUser);
      // if(!status.permitted){ ///buraya bakalim
      //   logoutWithRedirect(); 
      // }
      await setUserIdUserDB(status.userId)
    }  
    if(isAuthenticated){
      checkUser(user);
      i18n.changeLanguage(user.locale)
    }
  }, [isAuthenticated]);
const [editQuizId,setEditQuizId] = useState()
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <Navbar/>
      <Routes >
        <Route index path='/' element={<MainMenu/>}/>
        <Route path='/create' element={<CreateQuiz userIdUserDB={userIdUserDB}/>} />
        <Route path='/browsequizzes' element={<BrowsePage/>} />
        <Route path='/Quiz/:id' element={<Quiz/>} />
        <Route path='/comingSoon' element={<ComingSoon/>} />
        <Route path='/edit' element={<EditQuiz editQuizId={editQuizId} userIdUserDB={userIdUserDB}/>} />
        <Route path='/settings' element={<UserSettings userIdUserDB={userIdUserDB} setEditQuizId={setEditQuizId} />} />
        <Route path='/about' element={<About/>} />
        <Route path="*" element={<PageNotFound/>}>
          </Route>
      </Routes>
        </ThemeProvider>
    </div>
  );
}
export default App;