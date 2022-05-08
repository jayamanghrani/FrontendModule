/** 
 *TODO   Introduction 

            AJAX-- Asynchronous Javascript and xml

*? synchronous- means step by step exceution (in coding)
*?asynchronous- some code which will run in future . if step 1 is taking time to execute then step 2 will run it doesn't wait for step1

1. The main role of AJAX is to communicate with server.
There are 3 ways to communicate with server--AJAx, Fetch, axios

2.Before AJAX, In earlier days Is there any other ways to communicate with server?
Yes, Earlier we were communicating server using Html <form>tag+submit button and <a> tag.

    But there was drawback in this--
    Untill we got response from server our web page got freeze.Bad user experience in this. 
    For ex. in our web page if music is playing and if we are using form tag 
    and we clicked on submit button for server response. 
    Music will hang
                    In this approach, our whole page will refresh


------------------------------------------------------------------------------
*? If JS want to tak to server then:
1. AJAX/Fetch
2.Talk to API designed by the server provider.
3. JS send data in JSON/plain text/html/xml and receive response in JSON/plain text/html/xml.
4.After getting data from API, js will display that data using DOM.

*?What is JSON (Java Script Object Notation)
It is data representation format.

*?Why JSON data format is popular??
SUppose Server sends an array , 
how we will represent array in HTML/plain text/xml. HTML/XML/plain text don't have array.
We can very well represent array in JSON, 


*?Okay, In js we have JSON format. But how server will send data in JSOn??
In every lang , there are libraries to convert data into json
For ex. java
5 Useful JSON libraries in Java--
https://javarevisited.blogspot.com/2016/09/top-5-json-library-in-java-JEE.html#axzz7LVnIRkLf


*/
