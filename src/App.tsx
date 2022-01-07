import React from 'react';
import {Navbar} from "./Components/Navbar";
import {Router} from "./Router/Routes";
import styles from './Styles/App.module.scss'

function App() {
   return (
      <main>
         <Navbar/>

         <div className={styles.container}>
            <Router/>
         </div>
         
      </main>
   )
}

export default App;
