/** 

<script>

*?1. let ajaxreq= new XMLHttpRequest();   // we have made xhr object global, 
                                so it should available for other function(i.e. resp handler function)

*?2. Task of Response handler
        (a) Retrive data from server (in JSOn format)
        (b) Extract the data. (using JSON.parse)
        (c) Display the result at appropriate place on web page.

        One important thing--
        The data which we receive from server looks like JSON but it is String, (Reality)
        inside string we have JSON, so first we convert it in JS object.


      Syntax:
        ajaxreq.onreadystatechange = callback/handler func name;

        onreadystatechange is a property whose val is handler
        readySate is also a property whose val is from (0,1,2,3,4)
        0-uninitialized
        1-loading
        2-loaded
        3-Interactive
        4-Complete


 *?3. Send the communication
    This involve 2 steps-
    a)open() 
    b)send()       

    these are xhr methods

    open(method,url,isasynchronous)

    method-- get/post
    url-endpoint (in the words of API)
    isasynchronous- true (server se resp aane me time lg sakta h , and if we want hmara page hang na ho then it should be true)

  *TODO    GET request--

          Sample code:1
                  ajaxreq.open("GET","getproductdetails.jsp",true);

                  2 parameter--should be complete url,
                  If we are using our server then we can give relative name

          Sample code:2
          
                  The data will pass along with url---also called as payload
                    
                  ajaxreq.open("GET","getproductdetails.jsp?id=10241",true);
                  send(null);


      

 
*TODO     POST req--
      If req is post then ---> send("id=10241");  

      And to inform server that we are sending data in body while post req 
      we have to add extra method-

      ajaxreq.open("POST","getproductdetails.jsp","true")
      ajaxreq.setRequestHeader("content-type","application/x-www- form-urlencoded");
      ajaxreq.send("id=10241");

</script>

*?4. Retrive the data

    function fname()
    {
      if(ajaxreq.readyState==4 && ajaxreq.status==200)
      {
        var x=ajaxreq.responseText;
        //further processing
      }

    }


*/
