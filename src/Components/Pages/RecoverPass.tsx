import React, { ChangeEvent, useState } from 'react';
import { testApi } from '../../Api/api';

export const RecoverPass = () => {

   const [date, setDate] = useState('')

const onSendDate = () => {
   testApi.recoverPassForgot(date)
}

const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
   setDate(e.currentTarget.value)
}


   return (
      <div>
         <form>
            <input type="text"
             onChange={onChangeText}
         
             />
            <button onClick={onSendDate}>send</button>
         </form>
      </div>
   );
};

