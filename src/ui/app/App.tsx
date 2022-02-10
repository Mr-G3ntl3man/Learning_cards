import React, {useEffect} from 'react';
import {Router} from "../router/Routes";
import {Tooltip} from "../components/common/Tooltip";
import {useAppSelector} from '../../bll/store';
import {authStatuses, firstFetchMe} from "../../bll/auth-reducer";
import {Spinner} from "../components/common/Spinner";
import {useDispatch} from "react-redux";

const App = () => {
   const dispatch = useDispatch()

   const theme = useAppSelector<'light' | 'dark'>(state => state.app.theme)
   const authStatus = useAppSelector<authStatuses>(state => state.auth.authStatus)

   useEffect(() => {
      theme === 'light'
         ? document.body.style.background = 'linear-gradient(#E6D4DE, #9890C7)'
         : document.body.style.background = 'rgb(32, 32, 35)'
   }, [theme])

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
