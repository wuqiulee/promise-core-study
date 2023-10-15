const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

class Promise {
  constructor(executor) {
    this.status = PENDING; // promise默认的状态
    this.value = undefined; // 成功的原因
    this.reason = undefined; // 失败的原因
    const resolve = (value) => {
      // 成功resolve函数
      if (this.status === PENDING) {
        this.value = value;
        this.status = FULFILLED; // 修改状态
      }
    };
    const reject = (reason) => {
      // 失败的reject函数
      if (this.status === PENDING) {
        this.reason = reason;
        this.status = REJECTED; // 修改状态
      }
    };
    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }
  then(onFulfilled, onRejected) {
    // onFulfilled, onRejected
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
