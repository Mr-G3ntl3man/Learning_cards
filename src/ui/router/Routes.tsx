import React from 'react';
import {Outlet, Route, Routes} from "react-router-dom";
import {Login} from "../components/pages/Login";
import {NotFound} from "../components/pages/NotFound";
import {SetNewPass} from "../components/pages/SetNewPass";
import {Profile} from "../components/pages/Profile";
import {ForgotPass} from "../components/pages/ForgotPass";
import {Registration} from "../components/pages/Registration";
import {TestPage} from "../components/pages/TestPage";
import {Navbar} from "../components/common/Navbar";
import {PacksList} from "../components/pages/PaksList";
import {CardsList} from "../components/pages/CardsList";
import {LearnCards} from "../components/pages/LearnCards";
import {Learn} from "../components/pages/Learn";
import styles from "../styles/App.module.scss";
import {EditProfile} from "../components/pages/EditProfile";
import {UserProfile} from "../components/pages/UserProfile";

export enum PATH {
   LOGIN = '/',
   TEST = '/test-page',
   PROFILE = '/profile',
   LEARN = '/learn-cards',
   PACKS_LIST = '/packs-list',
   REGISTRATION = '/registration',
   EDIT_PROFILE = '/profile/edit',
   FORGOT_PASS = '/forgot-password',
   SET_NEW_PASS = '/set-new-password/:token',
   USER_PROFILE = '/profile/:user_name/:user_id',
   CARD_LIST = '/packs-list/:packName/:cardsPack_id/:user_id',
   LEARN_CARDS = '/learn-cards/:packName/:cardsCount/:cardsPack_id',
}

const LayoutMain = () => (
   <>
      <Navbar/>

      <div className={styles.container}>
         <Outlet/>
      </div>
   </>
)

const Layout = () => (
   <div className={styles.wrapper}>
      <Outlet/>
   </div>
)


export const Router = () => (
   <Routes>

      <Route element={<Layout/>}>
         <Route path={PATH.LOGIN} element={<Login/>}/>
         <Route path={PATH.FORGOT_PASS} element={<ForgotPass/>}/>
         <Route path={PATH.SET_NEW_PASS} element={<SetNewPass/>}/>
         <Route path={PATH.REGISTRATION} element={<Registration/>}/>
      </Route>

      <Route element={<LayoutMain/>}>
         <Route path={PATH.LEARN} element={<Learn/>}/>
         <Route path={PATH.TEST} element={<TestPage/>}/>
         <Route path={PATH.PROFILE} element={<Profile/>}/>
         <Route path={PATH.CARD_LIST} element={<CardsList/>}/>
         <Route path={PATH.PACKS_LIST} element={<PacksList/>}/>
         <Route path={PATH.LEARN_CARDS} element={<LearnCards/>}/>
         <Route path={PATH.EDIT_PROFILE} element={<EditProfile/>}/>
         <Route path={PATH.USER_PROFILE} element={<UserProfile/>}/>
         <Route path={'*'} element={<NotFound/>}/>
      </Route>

   </Routes>
)

