export const returnFileSize = (n: number) => {
   if (n < 1024) {
      return n + 'bytes';
   } else if (n > 1024 && n < 1048576) {
      return (n / 1024).toFixed(2) + ' KB';
   } else if (n > 1048576) {
      return (n / 1048576).toFixed(2) + ' MB';
   }
};


export const fileSizeMb = (n: number) => +(n / 1048576).toFixed(2)
