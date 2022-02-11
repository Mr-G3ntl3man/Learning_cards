import React, {useEffect} from 'react';
import {Router} from "../router/Routes";
import {Tooltip} from "../components/common/Tooltip";
import {useAppSelector} from '../../bll/store';
import {authStatuses, firstFetchMe} from "../../bll/auth-reducer";
import {Spinner} from "../components/common/Spinner";
import {useDispatch} from "react-redux";

const App = () => {
   const dispatch = useDispatch()

   const authStatus = useAppSelector<authStatuses>(state => state.auth.authStatus)

   useEffect(() => {
      dispatch(firstFetchMe())
   }, [])

   if (authStatus === authStatuses.IDLE
      || authStatus === authStatuses.LOADING) return <Spinner/>

   return (
      <main>
         <Tooltip/>
         <Router/>
      </main>
   )
}


export default App;
