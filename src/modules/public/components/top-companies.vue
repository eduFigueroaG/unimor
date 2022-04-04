<template>
  <div>
    <v-row align="stretch">
      <v-col cols="12" v-if="items.length===0">
        <h2>No hay empresas necesarias</h2>
      </v-col>
      <v-col sm="12" md="4" lg="3" v-for="(item,index) in items" :key="item.id">
        <card-item :id="item.id" :title="item.name" :description="item.description"
                   :rating="getStarsValue(item.comments)" :url="getFirsPhoto(item.photos)"></card-item>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { publicMixin } from "@/modules/public/mixins";
import axios from "@/plugins/axios";
export default {
  mixins: [publicMixin],
  components: {
    CardItem: () => import("@/modules/components/card-item"),
  },
  data(){
    return{
      items: [],
    }
  },
  methods:{
    getFirsPhoto(array){
      if (array.length===0){
        return ''
      }else{
        return array[0].name
      }
    },
    getStarsValue(array){
      let rating = 0
      if (array.length===0){
        return 0.0
      }else{
        for(let i=0; i<array.length; i++){
          rating = rating +array[i].rating
        }
        return rating / array.length
      }
    },
    getTopCompanies(){
      axios.get('company/all/top')
          .then(res=>{
            console.log(res)
            if (res.status){
              this.items = res.data.data
            }
          }).catch(err=>{
        console.log(err)
      })
    },
  },
  mounted() {
    this.getTopCompanies()
  }
}
</script>
