import React, { ChangeEvent } from 'react';
import { testApi } from '../../Api/api';

export const RecoverPass = () => {

const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
   testApi.recoverPassForgot(e.currentTarget.value)
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

