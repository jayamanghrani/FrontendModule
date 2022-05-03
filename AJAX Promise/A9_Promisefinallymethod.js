/**

*?Sometimes, we may want to execute the same piece of code whether the promise is fulfilled 
or rejected. 

*?For example, we may want to inform our team lead about the state of the project in either case .


 */
p.then(
    (msg)=>{
        sqaureval.innerHTML= "Its square is"+msg;
        sqaureval.innerHTML+="Thankyou for using the app";

    },
    (msg)=>{
        sqaureval.innerHTML= msg;
        sqaureval.innerHTML+="Thankyou for using the app";
        }
  );


// Alternate way:


p.then((successmsg)=> {sqaureval.innerHTML= "Its square is"+successmsg;})
.catch((error)=>{sqaureval.innerHTML= error;})
.finally(()=>{sqaureval.innerHTML+="Thankyou for using the app";})