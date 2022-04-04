<template>
  <v-card
      class="d-flex flex-column mt-auto"
      height="100%"
      max-height="500"
      elevation="5">
    <v-img v-if="url!==''"
        max-height="150"
        height="150"
        :src="baseURL+'company/photo/img/'+url"
    ></v-img>
    <v-img v-else
           max-height="150"
           height="150"
           src="@/assets/no_image.png"
    ></v-img>
    <v-card-title>{{title}}</v-card-title>
    <v-card-text>
      <v-row class="">
        <v-col sm="12" md="4" lg="4">
          <v-rating
              :value="rating"
              color="amber"
              dense
              half-increments
              readonly
              size="20"
          ></v-rating>
<!--          <div class="grey&#45;&#45;text">
            4.5 (413)
          </div>-->
        </v-col>
      </v-row>
      <div class="mb-10">
        <p :class="description.length > 250?'text-truncate':'text-justify'">
          {{description}}
        </p>
      </div>
    </v-card-text>
    <v-card-actions class="card-actions">
      <v-btn :to="{name: 'unimor.companies.details', params: {id: id}}"
          color="secondary"
          text>
        DETALLES
      </v-btn>
      <v-spacer></v-spacer>
<!--      <v-btn text color="red">
        <v-icon color="red">
          mdi-heart
        </v-icon>
        <span class=" ">256</span>
      </v-btn>-->
    </v-card-actions>
  </v-card>
</template>
<script>
import Config from "@/config/baseUrl";

export default {
  props: ['id', 'title', 'description', 'url','rating'],
  data(){
    return{
      baseURL:  Config.baseURL()
    }
  }
}
</script>
<style scoped>
.card-actions{
  position: absolute;
  bottom: 0;
}
</style>
