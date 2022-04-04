<template>
  <div>
    <v-row align="stretch">
      <v-col sm="12" md="4" lg="3" v-for="(item,index) in items" :key="item.id">
        <card-item :id="item.fav.id" :title="item.fav.name" :description="item.fav.description"
                   :rating="getStarsValue(item.fav.comments)" :url="getFirsPhoto(item.fav.photos)"></card-item>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <div class="text-center mb-4">
          <v-pagination
              class="text-left "
              v-model="page"
              :length="pageCount"
              color="primary"
              @input="next"
          ></v-pagination>
        </div>
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
      page: 1,
      itemsPerPage: 10,
      search: '',
      items: [],
      pageCount: 0,
    }
  },
  methods:{
    next(){
      if (this.search === null){
        this.search = ''
      }
      this.getCompanies(this.page-1,"")
    },
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
    getCompanies(page, search){
      axios.get('fav/find?page='+page)
          .then(res=>{
            console.log(res)
            if (res.status){
              this.items = res.data.data.content
              this.pageCount = res.data.data.totalPages
              if (res.data.data.first){
                this.page = 1
              }
            }
          }).catch(err=>{
        console.log(err)
      })
    },
  },
  mounted() {
    if (!localStorage.getItem("access-token")){
      this.$router.push({name: 'Home'})
    }
    this.getCompanies(0,'')
  }
}
</script>
