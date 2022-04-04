<template>
  <div class="Details-layout">
    <site-navbar></site-navbar>
    <v-container  class="mt-4">
      <site-content></site-content>
    </v-container>
  </div>
</template>
<script>
export default {
  name: "DetailsLayout",
  components:{
    SiteNavbar: () => import("@/layouts/components/site-navbar"),
    SiteContent: () => import( "@/layouts/components/site-content"),
  }
}
</script>
