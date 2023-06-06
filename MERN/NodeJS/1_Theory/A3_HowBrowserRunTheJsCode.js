/** 
// How Javascript code run in browser

*? Code                     |  Browser run time(contains Javascript V8 engine, Web API and so many things)

// document.getElementById  |   document obj provided by Web API,

// window                   |   window obj provided by Web API,

// for loop , datatypes     |   loops , datatypes provided by Javascript V8 engine.



*? The browser's JS Runtime is comprised of 4 major elements:

1. Javascript engine (made up of heap and call stack)-heap me obj rehte h 
aor baki method ko execute krne ke liye call stack

if we run code in
chrome - then Javascript engine will be V8
Mozilla- Spider Monkey
Microsoft Edge- chakra


2. Web API (provides- window obj, document, console, Timer, DOM)-> Web API's are created using C++

3. Callback queue (sare callbacks ko line store krne ke liye callback queue )
    Queue ki monitoring krne ka kaam - Event loop

*/

/**
  
 *?Now, How Node JS ka code runs 
 
 NodeJs runtime have all the thing JS engine, callback queue , event loop.
 Everything is same except Web API,  Instead  of Web API , here System API's are there.
 Since Web API nhi h to document, window, console -- ye sab objects yaha nhi honge


 In javascript, we can't access file, can't interact with db 
 But In Node , we can do this,using System API


 Note: FYI - Applications which runs offline using cache server,
  for those the runtime env is - Service worker runtime environment
 */
