//! JSON-Javascript Object Notation

/* It is just a format for representing and
        transmiting data from the server to the client or vice-versa.

        HTML generate UI
        JSON generate data
        */

//!JSON History
/*
        developed by douglas crockford in 2002
        later on soldto SUN-Microsystem.
        */

//!Why use JSON??
/*JSON is language independent,
        we can convert an object created in any prog lang into json and transmit it over the network

        we can also convert any JSON received from the server into Javascript objects.


        backend (Array)-----> JS(JSON.parse will give array)
        backend (Object)---->JS(JSON.parse will give obj)

*/

//! JSON Syntax
/** json syntax is a subset of the javascript syntax

*? JSON syntax Rule
    1.Data is in name/value pair.
    2.Data is seperated by commas.
    3.Curly braces hold objects.
    4.Square brackets hold array.


    json obj ----{"name":"Ravi"}  // In this "" in keys also

    JS obj ---{name,"Ravi"}

        In json data, key must be strings, written with double quotes.
              value can be of one from 6 data type.


*?In JSON, all values must be one of the following data type-
1.String
2. Number
3.Object -->{}
4.Arrays
5.Boolean


*?String ex.   {"name":"Ravi"}

*?Number ex.  {"age":30}

*?Object ex.    {
                "employee":{"name":"Ravi","age",30,"city":"Delhi"}
                }

                to access value
                 obj=JSON.parse(...);
                 let e=obj.employee;
                 name=e.name;
                 age=e.age;


                here,
                empolyee--key
                value--object 
                In outer alo we have {} , i.e also object


*?Object ex.  {
                "employees":["Ravi",Amit,"Piyush"]
                }

                to access values--
               let e=obj.employees;
               e.length;
               e[0] 


*?JSOn Null values--
        ex-- {"commission":null}

*/

//! Converting JSON data to Javascript object

/** When we receive JSON data from a webserver,the data is always a String

 To handle this data easily 
and efficiently we need to convert it into Javascript object and this is done with JSON.parse()

*?Example:-
Imagine we received this text from web server.

                '{"name":"Ravi","age":30,"city":"Delhi"}'


     JSON.parse()---will convert it into Js object           


*/
