/**
//! Introduction to Async

 async is a keyword , jo function keyword ke pehle lgaya jata h 
 async agar func ke pehle aa rha h means -- us func ke andr kuch asynchronous code chl rha h 

    ex. function makepromise(){   } 
            eska naam makepromise h , usse pta chla hme eske andr promise use hua 
            aor code async hua but jaruri nhi hr bar naam se smajh aa jaye.

esliye async function makeapromise() {}



 Role of async
 1. code ki readability bda deta h, developer async dekh ke smjh sakta ki ye code me asynchronous use hua h . 
 
2. If async likha h function ke aage, to vo function return krega promise ka obj ,
                                 agar promise nhi bhi return ho rha hoga to bhi krega , 
                                 and promise ke obj ke andr hoga resolve ka call.


        *? let's understand the 2nd point -
        a) if func is already returning promise , then async kuch nhi krega.

        b) if function is returning non-promise value ex. number, string , array
        then async will come in picture , and it will wrap this return value in promise object forcibly(jbrdasti)

        js ki jid h , agr func me async lga to vo return value to promise obj me wrap kr dega

3. And suppose if func return nothing , then as per js rule it will return undefined
at the time async will wrap undefine in promise obj .


In any case , async keyword is there, that means it will return promise obj.


*? and promise obj ke andr resolve ka call rhega

 */