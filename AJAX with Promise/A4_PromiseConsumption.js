//! Consuming a promise

/*Steps-
1. First we will take promise obj by making call to makepromise() [which we have created in Promise creation last class]

2. Promise obj has 2 methods-
   then() , catch()

   p.then(...)
   p.catch(....)

   then()
   -> is a method
   ->takes 2 callback argument , let's assume name -- success and failure, these func can be anonymous(without name)
   ->method syntax [ p.then(success,failure) ]
   -> {if inside received promise obj with  func call(resolve()) ,so}  then() method will call it's  success() fun
   ->{if inside received promise obj, with func call(reject()) ,so} then method will call it's failure() fun.


   At the time of promise creation
   whatever parameter we have passed in resolve that will go in success function.

   resolve("Hurray! I completed the prj"); ----> This msg will go in success function

   reject("sorry! couldn't complete the prj");-----> This msg will go in failure function

*/
