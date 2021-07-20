Find using axios libiraries sometimes return a whole page even the request is successful. 

When I use this code, I find sometimes it return a whole page. (issue [#717](https://github.com/axios/axios/issues/717#issue-209262742) | [#889](https://github.com/axios/axios/issues/889) ) 

```javascript
axios.
  .get("URL")
  .then((result) => {
    console.log(result.data)
  })
```



Find a detail description in issue [#61](https://github.com/axios/axios/issues/61). 

Try to use the code below and success

``` javascript
axios.
  .get("URL")
  .then((res) => res.data) // seems parse? ideas from when using fetch, do not understand why it works
  .then((result)=>{
    console.log(result) // not .data
  })
```

And find issue #61 has been fixed in [#3688](https://github.com/axios/axios/pull/3688). 

According to the improvement description, you can also use:

```javascript

    axios
      .get("URL", {
        responseType: "json",
        transitional: {
          silentJSONParsing: false // accroding the description, should use false, but I find true is also works, confused
        }
      })
      .then((result) => {
        console.log(result.data); // Remember .data
      });
```
