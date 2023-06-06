/**

*?Node JS is the product of C++.

Ab C++ ka code kp JS kaise chlati h -- Using Bindings

Bindings are translators hote h jo JS ka function call lete h aor use translate krte h C++ me

document.querySelector()

hme lgta h background me kaam JS kr rhi h but actuall code C++ ka code chl rha h 
using Bindings.


Since Node JS ka source code C++ me likha gya h to Node JS ke pass kuch C++ ki libararies hongi

C, C++  know how to access file , access hardware, these languages are master in that field.

and Node JS using Binding can do all these things 

To read file in Node JS we use -
fs.readFile()- dikhne me to ye js ka function h 
but actual me internally C++ ka function call ho rha h 


Node JS can tell, which OS we are using 
through C++ binding(i.e using OS module and it's platform function),
Javascript can't tell this.


like fs.readFile()-- using fs module

same os.platform() -- using OS module



Node.js is a command line runtime that includes the core JavaScript runtime,
 but extracted from the Chrome browser itself. 
 So, with Node, you have the ability to write and run JavaScript,
  but you aren't running it inside of a browser and 
  therefore you don't have the Document Object Model (DOM) or the Browser Object Model (BOM)
   available to you


 Once Node.js has been installed,
  we can run the node command to start the JavaScript interpreter.
   At this point, Node.js allows you to write JavaScript. 
   It's basically the Console in the DevTools but in the command prompt. 















*/
