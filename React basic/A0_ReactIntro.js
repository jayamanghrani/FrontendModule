/**
//! Agenda
1. What is React?

2. what problem react solves?

3. What are SPA(Single page Applications)?

4. Challenges in developing SPA

5. Advantage of react


//!Prerequisite:
HTML, CSS, JS(ES6 part--let, const, arrow function, class, constructor)


//!DIff b/w React JS and React native
React JS --- for web app
React native - for mobile app

//! What is React?
popular library of Javascript , React has created by facebook.

Since facebook is no1 company , so they have created optimized library and always keeps updated,
current version React 18.

React is backward compatible.(if we coded in react 18, it will run in react 17 also).

React is open source(source code is on internet)

React is used for creating UI with single page application.


//! In web app

We have multiple pages(Home, search, update) then we linked each other as per requirement

In react , we can create by single page app


Ex1:- jsp style
1.index.html
2.searchIteam.html
3.item-details
order.html

for every activity , different page ,

*? some content in all these pages (lke header, footer, sidebaar) is same .
*? again again , every req me pura data aayega, so network pe load aayega. site slow hogi.

//!SPA
1. Main page
in every req , only that much data wil come , which is required,
application will be fast


*?Example of JSP style app(Multipage)--
1.ipl teams (https://www.iplt20.com/teams/men),
2.amazon
for every activity(click on link ...)whole page will referesh.
server se pura page bulvaya ja rha h.that's why it is slow, due to which app get lags

*?Example of React style app--
netflix
react website
Gmail
every time/activity , whole page will not refresh


//! single page app kaise pehchane?
if fontend- angular/react 
backend - jsp 

That App is SAP

becasue SPA backend dekhke decide nhi hota.uske liye frontend pe angular/react hona chaheye
backend only generate data, 


//! how to create SPA ?What is problem in Single page App if we don't use react/angular

1. lot of DOM manipulation(ex- createElement, append ...) (DOM is JS library )
2. problem in keeping data in sync with the UI.
3. managing html templates.(if large data is coming from server, then in js me table creation and table ka css changes
                            react will make this easy)

 
server -----json ----->JS(JS will have to create structure using DOM as per data like table)



 //! In react
 server ---json data ----React (react will easy the UI designing part, our work will easy)

 React ke pass khud ka DOM h , ie. Virtual DOM

 DOM site ko slow kr deta h , react memory me DOM ki copy bnata h .
 React says change in virtual DOM, and it will automatically fast changes in actuall DOM.

 example

 Time : Hours:Minutes:Sec

 React says every sec only seconds will change.

 so if time is 

 11:35:45

 so only 45 vala part should change, why to change whole time every se i.e. Hour or minutes


//! React kis tarah ki library ?
Component Based Library

Example:
suppose our website contain 4 div 

if we will not use react , 4 times we will have to write div
so
 <div>
    C lang
    </div>

     <div>
    C++ lang
    </div>


In react
will create a component , in component we will create placeholder, where data will be update

<customer name="C lang">
<customer name="C++ lang">


//!To take input from user 

In html-> Form 
In react ->Hook library , 

//!React history
React designed by Jordan Walke
2013--0.3.0 version

2015 -- netfilix used it
2016--- 15 version
2022---18.0.0


//! why react first choice--

Google Trends
https://trends.google.com › trends

see comparision

*/