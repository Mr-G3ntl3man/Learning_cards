import React, {useState} from 'react';
import {Button} from "../Button";
import {Input} from '../Input';
import styles from '../../Styles/Test.module.scss'
import {Checkbox} from "../Checkbox";
import {Radio} from "../Radio";

export const TestPage = () => {
   const options = ['1', '2', '3']
   const [value, setValue] = useState(options[0])

   return (
      <div>
         <h2>Test page </h2>


         <div className={styles.wrapper}>
            <Button>
               Button
            </Button>

            <Input/>

            <Checkbox>
               Checkbox
            </Checkbox>

            <Radio value={value} onChangeOption={setValue} options={options}/>

         </div>

      </div>
   );
};

