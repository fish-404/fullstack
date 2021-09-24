CodeSandbox: https://codesandbox.io/s/blog-list-application-back-d9tee?file=/src/index.js

Reference: [Jest matching objects in array - Medium](https://medium.com/@andrei.pfeiffer/jest-matching-objects-in-array-50fe2f4d6b98) 

📌Tips:

* For Ex 4.14: When you use Mongoose `findByIdAndUpdate()` API, remember set options `new` true to get updated documented, or it will default be false.
> [options.new=false] «Boolean» By default, findByIdAndUpdate() returns the document as it was before update was applied. If you set new: true, findOneAndUpdate() will instead give you the object after update was applied. To change the default to true, use mongoose.set('returnOriginal', false);.
