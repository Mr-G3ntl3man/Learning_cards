import React from 'react';
import {Route, Routes} from "react-router-dom";
import {Login} from "../Components/Pages/Login";
import {NotFound} from "../Components/Pages/NotFound";
import {NewPass} from "../Components/Pages/NewPass";
import {Profile} from "../Components/Pages/Profile";
import {RecoverPass} from "../Components/Pages/RecoverPass";
import {Registration} from "../Components/Pages/Registration";
import {TestPage} from "../Components/Pages/TestPage";

export enum PATH {
   REGISTRATION = '/registration',
   LOGIN = '/login',
   PROFILE = '/profile',
   RECOVER_PASS = '/recover_password',
   NEW_PASS = '/new_password',
   TEST = '/test_page',
}


export const Router = () => {
   return (
      <Routes>
         <Route path={PATH.LOGIN} element={<Login/>}/>
         <Route path={PATH.REGISTRATION} element={<Registration/>}/>
         <Route path={PATH.PROFILE} element={<Profile/>}/>
         <Route path={PATH.NEW_PASS} element={<NewPass/>}/>
         <Route path={PATH.RECOVER_PASS} element={<RecoverPass/>}/>
         <Route path={PATH.TEST} element={<TestPage/>}/>
         <Route path={'*'} element={<NotFound/>}/>
      </Routes>
   )
}

