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
      <div style={{backgroundColor: 'white'}}>
         <h2>Test page </h2>


         <div className={styles.wrapper}>
            <div style={{width: '200px', margin: '0 20px'}}>
               <Button>
                  Button
               </Button>
            </div>


            <Input/>

            <Checkbox>
               Checkbox
            </Checkbox>

            <Radio value={value} onChangeOption={setValue} options={options}/>

         </div>

      </div>
   );
};

