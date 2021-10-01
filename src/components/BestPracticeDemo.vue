<template>
  <div>
    <p>num: {{ num }}</p>
    <button @click="emit">Click Me</button><br />
  </div>
</template>

<script>
export default {
  name: "BestPracticeDemo",
  data() {
    return {
      scheduledActions: [
        {
          event: "signal",
          action: "method",
        },
      ],
      num: 1,
    };
  },
  mounted() {
    this.scheduledActions.forEach((item) => {
      this.$bus.$on(item.event, this[item.action]);
    });
  },
  beforeDestory() {
    this.scheduledActions.forEach((item) => {
      this.$bus.$off(item.event, this[item.action]);
    });
  },
  methods: {
    method(data, callback) {
      this.num++;
      console.log(`this.num = ${this.num}, data:`, data);
      callback(this.num);
    },
    // 发送信号
    emit() {
      this.$bus.$emit("signal", { name: "signal", num: this.num }, (res) => {
        console.log("[$emit callback]: res = ", res);
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
