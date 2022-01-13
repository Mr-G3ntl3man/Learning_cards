import React from 'react';
import {Outlet, Route, Routes} from "react-router-dom";
import {Login} from "../components/pages/Login";
import {NotFound} from "../components/pages/NotFound";
import {NewPass} from "../components/pages/NewPass";
import {Profile} from "../components/pages/Profile";
import {RecoverPass} from "../components/pages/RecoverPass";
import {Registration} from "../components/pages/Registration";
import {TestPage} from "../components/pages/TestPage";
import {Navbar} from "../components/Navbar";
import styles from "../styles/App.module.scss";

export enum PATH {
   REGISTRATION = '/registration',
   LOGIN = '/',
   PROFILE = '/profile',
   RECOVER_PASS = '/recover_password',
   NEW_PASS = '/new_password',
   TEST = '/test_page',
   PACKS_LIST = '/packs_list',
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
         <Route path={PATH.REGISTRATION} element={<Registration/>}/>
         <Route path={PATH.RECOVER_PASS} element={<RecoverPass/>}/>
         <Route path={PATH.NEW_PASS} element={<NewPass/>}/>
      </Route>

      <Route element={<LayoutMain/>}>
         <Route path={PATH.PROFILE} element={<Profile/>}/>
         <Route path={PATH.TEST} element={<TestPage/>}/>
         <Route path={'*'} element={<NotFound/>}/>
      </Route>

   </Routes>
)

