const Promise = require("./core");

let promise = new Promise((resolve, reject) => {
  console.log("promise");
  throw new Error("失败了");
  reject("reason");
  resolve("value");
});
promise.then(
  (value) => {
    console.log("success", value);
  },
  (reason) => {
    console.log("err", reason);
  }
);
