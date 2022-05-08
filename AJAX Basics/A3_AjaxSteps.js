/** AJAX Process 

*TODO  to create date object in javascript
var obj= new Date();

 1. For AJAX communication, we need obj of XMLHttpRequest(XHR),
    This obj will take responsiblity for communicating with server.
    This obj will fetch data from API in JSON.

    XMLHttpRequest(XHR)is class available in all browsers, we can use in our code
    We can also find XHR in browser, Go to developer tools and open network tab, there
    we will get Fetch/XHR, Fetch API and XHR both has given by browser.


2. Now, If XMLHttpRequest(XHR) is a object then it will have methods,
     Using which it will communicate with server.then server will give response.
     response will be received by XHR obj.

 
 //? Steps ofAjax Programming--
 1. create obj for Ajax request.
 2.Specify a handler.   
 
        Using ajax hmara code req bhejega server ko, 
        jab hmm submit button use krte the html me to browser req bhejta tha server ko.
         there is no role of submit button in ajax.

         Now, when we communicate with server, do we get immediate response?
         No.sometimes immediate, something it takes time

         This 2nd step makes ajax code asynchronous.

         We will create a function which will run when we will get response from server.
         This type of function are called as response handler.

         This is relative of callback.i.e. We will create it ,but it will run when we get server response.
         and server response depends on network traffic.

         Ex of callback/handler

         let p=document.querySelector("p")
         p.onmouseover=changecolor;           //changecolor is callback, This line specifying a handler.

         
3. Send the request
    Using xhr method--open(), send()

 4. Retrieve the data--which we will write in handler.   








*/
