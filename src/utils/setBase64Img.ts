import {ChangeEvent} from "react";
import {fileSizeMb} from "./returnFileSize";
import {feedbackHandler} from "./feedbackHandler";
import {Dispatch} from "redux";

export const setBase64Img = (
   event: ChangeEvent<HTMLInputElement>,
   setBase64: (value: string | ArrayBuffer | null) => void,
   dispatch: Dispatch
) => {
   const reader = new FileReader();

   const file = event.target.files && event.target.files[0];

   if (file) {
      if (fileSizeMb(file.size) > 1.20) {
         feedbackHandler(`Max photo size 1.20 MB, your photo ${fileSizeMb(file.size)} MB`, dispatch)
         return
      }

      reader.readAsDataURL(file)
      reader.onloadend = () => setBase64(reader.result)
   }
}