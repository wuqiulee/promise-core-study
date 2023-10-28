const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

class Promise {
  constructor(executor) {
    this.status = PENDING; // promise默认的状态
    this.value = undefined; // 成功的原因
    this.reason = undefined; // 失败的原因
    this.onResolvedCallbacks = []; // 存放成功的回调方法
    this.onRejectedCallbacks = []; // 存放失败的回调方法
    const resolve = (value) => {
      // 成功resolve函数
      if (this.status === PENDING) {
        this.value = value;
        this.status = FULFILLED; // 修改状态
        // 发布
        this.onResolvedCallbacks.forEach((fn) => fn());
      }
    };
    const reject = (reason) => {
      // 失败的reject函数
      if (this.status === PENDING) {
        this.reason = reason;
        this.status = REJECTED; // 修改状态
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };
    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }
  then(onFulfilled, onRejected) {
    // 订阅模式
    if (this.status == PENDING) {
      // 代码是异步调用resolve或者reject的
      this.onResolvedCallbacks.push(() => {
        onFulfilled(this.value);
      });
      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason);
      });
    }
    if (this.status == FULFILLED) {
      // 成功调用成功方法
      onFulfilled(this.value);
    }
    if (this.status === REJECTED) {
      // 失败调用失败方法
      onRejected(this.reason);
    }
  }
}

module.exports = Promise;
