import React, {useEffect} from 'react';
import {authStatuses, fetchMe} from "../../../bll/auth-reducer";
import {useDispatch} from "react-redux";
import {Navigate} from "react-router-dom";
import {PATH} from "../../router/Routes";
import {useAppSelector} from "../../../bll/store";

export const Profile = () => {
   const dispatch = useDispatch()

   return (
      <div>
         Profile page
      </div>
   );
};

