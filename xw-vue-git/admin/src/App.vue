<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
    
  </div>
</template>

<script>
export default {
  name: 'App',
  provide(){
    return{
      reload: this.reload
    }
  },
  data () {
      return {
        isRouterAlive:true
      }
    },
    methods:{
      reload () {
        this.isRouterAlive = false
        this.$nextTick(function(){
          this.isRouterAlive =true 
        })
      }
    }
}

</script>

<style>
@import url("../src/static/css/app.css");
@import url("../src/static/css/font-awesome.css");

/* *{font-size: 12px;} */
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  /* font-family:"Microsoft YaHei"; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
}
</style>
