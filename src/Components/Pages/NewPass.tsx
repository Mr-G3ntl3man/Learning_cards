import React, { ChangeEvent } from 'react';
import { testApi } from '../../Api/api';

export const NewPass = () => {

   const onChangePass = (e: ChangeEvent<HTMLInputElement>) => {
      testApi.recoverPassNewPass(e.currentTarget.value)
   }

   return (
      <div>
         <form >
            <input type="text" onChange={onChangePass}/>
            <input type="text" />

            <button>setPass</button>
         </form>
      </div>
   );
};

