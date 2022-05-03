/**
*?When a promise is getting rejected we are using failure function ,

*?Instead of that , we can use the catch() method of the Promise object
*/

p.then(
        (msg)=>{
            sqaureval.innerHTML= "Its square is"+msg;
        },
        (msg)=>{
            sqaureval.innerHTML= msg;
            }
      );


// Alternate way:
// then return promise so we can call catch method by (.)

p.then(
    (msg)=> {sqaureval.innerHTML= "Its square is"+msg;}
      )
.catch(()=>{sqaureval.innerHTML= msg;})