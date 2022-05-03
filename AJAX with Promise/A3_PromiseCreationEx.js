//!Assignment
//! Requirement- want to create promise and if passing val(n) is even then promise should call resolve 
//! otherwise it should call reject


function makePromise(n)
{
    return new Promise(function(resolve,reject){

        let value =n;
        if(value%2==0)
        {
            resolve("Promise obj created with msg Hurray! I completed the prj");
        }
        else
        {
            reject("Promise obj created with msg sorry! couldn't complete the prj");
        }

    });

}

 let p = makePromise(6);

//  In line 23, we are calling makePromise() and it will return a obj in p . 
//in p we will get obj in  which function call will be there either of resolve(msg) or reject(msg).
// only fun call will be there , if we want to result from that func call
// then we will have to consume promise obj. which we will learn in next class.