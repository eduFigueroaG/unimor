<template>
  <div class="default-layout">
    <site-navbar></site-navbar>
    <v-container fluid class="mt-4">
      <site-content></site-content>
    </v-container>
  </div>
</template>
<script>
export default {
  name: "DefaultLayout",
  components:{
    SiteNavbar: () => import("@/layouts/components/site-navbar"),
    SiteContent: () => import( "@/layouts/components/site-content"),
  }
}
</script>
