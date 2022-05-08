//! Promise is build in class in js.Promise is well suited for handling asynchronous operations.
/**
 *  promise class h to eska constructor hoga, that construction takes function as parameter.
 * 
 es Promise class ka hmm bnayenge object 
let p = new Promise(executor/function);
*/



//! NOTE :--  Promise obj take function as argument and also returns a function only.

/**  Let's understand promise
*?  promise has 3 states---

1. unresolved
2.resolved
3. rejected


*?  Steps needed for promise creation --
1. Creating a promise
2. Consuming a promise


 promise class h to eska constructor hoga, that construction takes function as parameter.
And that function is of 2 argument
    
        let p= new promise(myfunc(resolve,reject){}); 

                    arg1= function resolve
                    arg2 = function reject

                    *?Example--

                    function myfunc(resolve,reject)
                    {
                        ----do some task----
                        if(completed)
                        {
                            resolve();
                        }
                        else
                        {
                            reject(arg); 
                        }
                    }

     *? We can call like below-
      let p= new Promise(myfunc)


      *?Alternate way 

      instead of passing myfunc in parameter, we can give body there only

     function makePromise()
    {    
        let p = new Promise(function(resolve,reject){

            ----do some task----
            if(completed)
            {
                resolve();
            }
            else
            {
                reject(arg); 
            }

        });

        return p;
    }

 And whatever task which we will do inside promise , It will have 2 states 
  either completed or incompleted

till now, we understood how to create promise, 

//! Now, we will understand how promise creation will work--

as soon as [new promise()] will run ---it will call handler/callback/executor-->(function(resolve,reject))

working Steps of  executor/handler/callback

1. do task
2. check
3. if success then call to resolve()
4. if failed then call to reject()

*/


//! 2. Consume:

/*
For consume , we need promise ka return value , i.e (p) which we have created at the time of promise creation.

We can take that p 2 ways-

1.either make p as global while creation


2. return p , wherever u have created it.

 retun p; in last
                    or
 return new Promise(function(resolve,reject){
        -----------code-------
        }


b/c both are same -

1. let d = new Date();
        return d;


        v/s


   return new Date();


*/



 