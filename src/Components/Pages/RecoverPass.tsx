import React, {ChangeEvent} from 'react';
import {authApi} from '../../Api/api';

export const RecoverPass = () => {

   const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
      authApi.recoverPassForgot(e.currentTarget.value)
   }

   return (
      <div>
         <form>
            <input type="text" onChange={onChangeText}/>
            <button>send</button>
         </form>
      </div>
   );
};

