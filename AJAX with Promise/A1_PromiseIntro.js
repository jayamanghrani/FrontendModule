/**
 *TODO What is a promise?

*? Before Promise, will discuss about callbacks?

*? Callbacks in js --> Callback means When we pass a function as a argument or function without paranthesis.

Example 1--- .

function myfunc()
{
    console.log("hello");
}

setTimeout(myfunc,2000)   f1 is callback 

after 2 sec , f1 will call --then hello will print.



Example 2---
*? In ajax programming also, we were using callbacks.

xhr = new XMLHttprequest();
xhr.onreadystatechange= responsehandler;
-----
----

function responsehandler()
{
    ----
----
}

response handler is callback, which runs when we get value of readysate as server response

*/


//! and This is Asynchronous Programming(means that code which will run in future, that code is not part of sequential flow)

//! To simplify Asynchronsys programming via callbacks , Javascript introduces concept of Promises

//! promise are alternate of callbacks.

//! Also, currently we are doing server communication via ajax , but we  will do by mordern way i.e fetch api
//! and before learning fetch , we should have understanding of promises.

