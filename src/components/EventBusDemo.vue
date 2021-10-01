<template>
  <div class="hello">
    <span>num: {{ num }}</span
    ><br />
    <span>count: {{ count }}</span
    ><br /><br />
    <button @click="on">Subscribe One</button><br /><br />
    <button @click="off">UnSubscribe One</button><br /><br />
    <button @click="offAll">UnSubscribe All</button><br /><br />
    <button @click="emit">Click Me 1</button> |
    <button @click="$bus.$emit('event')">Click Me 2</button><br />
  </div>
</template>

<script>
export default {
  name: "EventBusDemo",
  data() {
    return {
      num: 1, // 申明变量
      count: 0, // 统计事件订阅的方法数目
    };
  },
  // 页面初始化后， 进行一次事件订阅
  mounted() {
    this.on();
  },
  // 页面销毁前取消订阅，否则有时候可能会导致订阅多次而没有取消订阅，最终一个方法执行多次
  beforeDestory() {
    this.off(); // 一般不会使用offAll吧，有点暴力hh, 注意不要随意订事件阅即可
  },
  methods: {
    // 定义函数方法
    // data为$emit传递的参数
    // 使用callback(arg)可以将arg作为参数返回给$on的回调函数(使用且仅使用最早callback的那个参数arg)
    myEvent(data, callback) {
      this.num++;
      console.log("$emit data", data);
      console.log("num = ", this.num);
      callback(this.num);
    },
    // 对事件添加一次订阅, 即添加一个监听器
    on() {
      // 通过eventBus订阅事件'event'绑定一个'myEvent'方法， 即添加一个监听器
      // 注意，同一方法可添加多次，并且如果没有被取消订阅的话，信息触发时全都会被一一执行
      this.$bus.$on("event", this.myEvent);
      // 统计数加一
      this.count++;
      console.log("count = ", this.count);
    },
    // 取消事件的一次订阅, 即移除一个监听器
    off() {
      // 取消对事件'event'的一个名为'myEvent'方法的订阅
      // 注意, 如果已经添加了多次，则只可取消一次，即$off这种双参数用法只可移除一个监听器
      this.$bus.$off("event", this.myEvent);
      // 统计数减一
      this.count--;
      console.log("count = ", this.count);
    },
    // 取消事件的所有订阅, 即移除所有监听器
    offAll() {
      // 取消对事件'event'的所有订阅
      // 即$off这种一个参数的用法, 只可移除指定事件名的所有监听器
      this.$bus.$off("event");
      // 统计数归零
      this.count = 0;
      console.log("count = ", this.count);
    },
    // 发送事件信号
    emit() {
      // 通过eventBus发出事件信号'event', 传递参数， 并定义回调函数(其参数为$on 第一个callback回来的值)
      this.$bus.$emit("event", this.num, (res) => {
        // 回调函数
        console.log("[event callback]: res", res);
      });
    },
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
