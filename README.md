# fullstackopen-fish
Personal Exercises of Fullstack open in https://fullstackopen.com/ [Suomi | English | 中文 | Spanish]

---

If you are not convinient to  install an environment in your computer, you can use online environment to simulate and learn:

 * [Replit](https://replit.com/~) 
 * [CodeSandbox](https://codesandbox.io/)
 * [StackBiltz](https://stackblitz.com/)

CodeSandbox Features:
- 😀 Provide React tool to see components status 
- 😀 Provide detail error messages 
- 😀 Successed in testing using Postman
- 🙁 Terminal font space is large, hard to use

StackBiltz Features:
- 😀 Provide multiple terminals in node.js blank project
- 🙁 Failed in testing using Postman
- 🙁 Not support Vim mode 

Relpit Features:
- 🙁 Seems can't update Node version (Now is v12)
- 🙁 Not support multiple terminals

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
 
