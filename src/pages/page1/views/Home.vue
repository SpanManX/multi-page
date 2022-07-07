<template>
  <div class="home">
    <img alt="Vue logo" src="../../../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  watch:{
    '$parent.dataa'(val){
    console.log(val)
    }
  },
  mounted() {
    // console.log(this.$parent)
  },
  render(h){
    return h('div','111111111111')
  }
}
</script>
