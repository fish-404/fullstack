# fullstackopen-fish
Personal Exercises of Fullstack open in https://fullstackopen.com/ [Suomi | English | 中文 | Spanish]

---

If you are not convinient to  install an environment in your computer, you can use online environment to simulate and learn:

  [Replit](https://replit.com/~) | [CodeSandbox](https://codesandbox.io/) |  [StackBiltz](https://stackblitz.com/)

###### CodeSandbox Features:

 😀 Provide React tool to see components status 
 
 😀 Provide detail error messages 
 
 😀 Successed in testing using Postman
 
 😀 Can create a application shotcut from Chrome, like a lightly application in your computer
 
 😐 Container will hibernate due to long inactivity, you need refresh browser to wake it up
 
 🙁 Terminal font space is large, hard to use
 
###### StackBiltz Features:

 😀 Provide multiple terminals in node.js blank project
 
 🙁 Failed in testing using Postman
 
 🙁 Not support Vim mode 
 
 🙁 Usually need to refresh to reconnect

###### Relpit Features:

 😀 Connection seems more stable, no need to refresh frequencely
 
 🙁 Seems can't update Node version (Now is v12)
 
 🙁 Not support multiple terminals
 
 ---

Note: 

Replit seems can't open two shell window, so you can't use it to complete Ex 2.11

Update: 

Find methods to complete Ex 2.11

You can use Node HTTP Server Template to create Sandbox, it allows you use multiple terminals.

Tips:
* install dependencies from its Dependencies pannel
* change `scripts` in `package.json` (let you can use `npm start` in terminal) :

  (when you restart the codesandbox, the scripts option has been applied in `yarn start`, so you don't need to start by yourself)

  ``` json
    "scripts": {
      "start": "react-scripts start",
      "build": "react-scripts build",
      "test": "react-scripts test",
      "eject": "react-scripts eject"
    }
  ```
* run json-server and react app by terminal, remember set json-server port like the lecture guide
* in codesanbox, open browser pannel when codesandbox question you whether to open, and you can get the json-server address to use
 
If you use Node HTTP Server template, you can't use React Tool.

Another option is you can create two CodeSandbox, one for front end, one for back end, I take this option in chapter 3.
