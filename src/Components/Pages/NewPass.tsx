import React, { ChangeEvent, useState } from 'react';
import { testApi } from '../../Api/api';

export const NewPass = () => {

   const [date, setDate] = useState('')


   const onChangePass = (e: ChangeEvent<HTMLInputElement>) => {
      setDate(e.currentTarget.value)
   }

   const onSendPass = () => {
      testApi.recoverPassNewPass(date)
   }

   return (
      <div>
         <form >
            <input type="text" onChange={onChangePass}/>
            <input type="text" />

            <button onClick={onSendPass}>setPass</button>
         </form>
      </div>
   );
};

