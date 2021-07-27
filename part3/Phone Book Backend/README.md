CodeSandbox Back End: https://codesandbox.io/s/phone-book-backend-bd6g4?file=/src/index.js

CodeSandbox Front End: https://codesandbox.io/s/phone-book-frontend-ngomj?file=/src/App.js

CodeSandbox will start you application automatically, and you can't write to the main terminal. 

And the `package.json` already use `nodemon src/index.js`, so you don't need to create `dev` command to use `nodemon`. 

Actually, if you create a `dev` command, you will get error when you run it because the main terminal has running you application.

Test Screenshot: 


![Post with Valid Data](https://github.com/fish-404/fullstackopen-fish/blob/master/part3/Phone%20Book%20Backend/postWithDatas.png)

![Post with Name Empty](https://github.com/fish-404/fullstackopen-fish/blob/master/part3/Phone%20Book%20Backend/postNameMissing.png)

![Post with Phone Number Empty](https://github.com/fish-404/fullstackopen-fish/blob/master/part3/Phone%20Book%20Backend/postPhoneMissing.png)

![Post with Duplicate Name](https://github.com/fish-404/fullstackopen-fish/blob/master/part3/Phone%20Book%20Backend/postUnique.png)

Custom morgan token screenshot:

![new morgan token result](https://github.com/fish-404/fullstackopen-fish/blob/master/part3/Phone%20Book%20Backend/morganMyToken.png)
