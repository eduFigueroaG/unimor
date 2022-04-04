<template>
  <v-app id="app">
    <v-main>
      <component v-cloak :is="layout"></component>
    </v-main>
    <!--    <site-footer></site-footer>-->
  </v-app>
</template>
<script>
const defaultLayout = "default";
export default {
  name: 'App',
  components:{
    //SiteFooter: () => import(/* webpackChunkName: "site-navbar" */ "@/layouts/components/site-footer"),
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || defaultLayout) + "-layout";
    }
  },
  data: () => ({
    //
  }),
};
</script>
<style lang="scss">
[v-cloak] {
  display: none;
}
#app{
  background-color: #F5F5F5;
}
</style>
