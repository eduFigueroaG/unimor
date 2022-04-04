<template>
  <div>
    <v-row>
      <v-col sm="12" md="8" lg="8">
        <v-card elevation="5" >
          <v-carousel class="" hide-delimiters>
            <v-carousel-item
                style="height: 300px!important; object-fit: cover!important;"
                v-for="(item,index) in company.photos"
                :key="index"
                :src="baseURL+'company/photo/img/'+item.name"
            ></v-carousel-item>
          </v-carousel>
          <v-card-title>
            <v-rating
                :value="getStarsValue(company.comments)"
                color="amber"
                dense
                half-increments
                readonly
                size="30"
                class=""
            ></v-rating>
            <v-spacer></v-spacer>
            <v-btn
                v-if="token"
                @click="addFav"
                text
                icon
                :color="existFav?'red':''">
              <v-icon>
                mdi-heart
              </v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <p class="text-justify">
              {{company.description}}
            </p>
            <p class="text-justify">
              <strong> Contacto:</strong> {{company.phone}}
            </p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col sm="12" md="4" lg="4">
        <v-card>
          <v-card-text>
            <v-card-title>
              <div>
                Comentarios
              </div>
              <v-spacer></v-spacer>
              <div v-if="token && !commentExist">
                <v-btn small @click="changeDialogComment" color="secondary" outlined>
                  <v-icon>
                    mdi-pencil
                  </v-icon>
                    AGREGAR COMENTARIO
                </v-btn>
              </div>
              <div v-if="!token" >
                <v-btn to="/auth/login" color="secondary" text small >
                  ¿Quieres comentar? Inicia sesion
                </v-btn>
              </div>
            </v-card-title>
            <h4 class="ml-4" v-if="company.comments.length===0">
              Sin comentarios
            </h4>
            <v-list three-line>
              <template v-for="(item, index) in company.comments">
                <v-list-item
                    :key="item.id">
                  <v-list-item-avatar>
                    <v-img v-if="item.user.photo===''"
                        src="@/assets/user.png"
                    ></v-img>
                    <v-img v-else
                        :src="baseURL+'company/photo/img/'+item.user.photo"
                    ></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-subtitle >
                      <v-rating
                          :value="item.rating"
                          color="amber"
                          dense
                          half-increments
                          readonly
                          size="16"
                          class=""
                      ></v-rating>
                    </v-list-item-subtitle>
                    <v-list-item-title >
                      {{item.user.person.name}} {{item.user.person.lastname}} {{item.user.person.surname}}
                    </v-list-item-title>
                    <v-list-item-subtitle >{{item.comment}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialogComment" max-width="500px">
      <v-card>
        <v-card-title class="text-h5 text-center justify-center primary white--text">
          <v-icon color="white">mdi-pencil</v-icon>
          Agregar comentario</v-card-title>
        <v-card-text class=" text-center mt-4">
          <v-rating
              v-model="comment.rating"
              :value="0"
              color="amber"
              dense
              size="30"
              class="mb-3"
          ></v-rating>
          <v-text-field
              v-model="comment.comment"
              placeholder="Comentario"
              label="Comentario"
              prepend-inner-icon="mdi-text"
              outlined>
          </v-text-field>
        </v-card-text>
        <v-card-actions class=" ">
          <v-spacer></v-spacer>
          <v-btn color="secondary" @click="changeDialogComment" outlined> CERRAR</v-btn>
          <v-btn @click="sendMessage" color="primary">
            Comentar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import axios from "@/plugins/axios";
import login from "@/modules/auth/components/login";
import Config from "@/config/baseUrl";

export default {
  data () {
    return {
      existFav: false,
      baseURL: Config.baseURL(),
      commentExist: false,
      rating: 0,
      dialogComment: false,
      token: null,
      photos: [],
      company:{
        name: '',
        phone: '',
        description: '',
        photos: [],
        comments: [],
        category: ''
      },
      comment:{
        comment: null,
        rating: 0.0,
      }
    }
  },
  methods:{
    addFav(){
      if (this.existFav){
        axios.delete('fav/delete/'+this.$route.params.id)
            .then(res=>{
              console.log(res)
              if (res.data.status){
                this.isFav();
                this.getCompanyById(this.$route.params.id)
              }
            })
            .catch(err=>{
              console.log(err)
            })
      }else{
        axios.post('fav/save/'+this.$route.params.id)
            .then(res=>{
              console.log(res)
              if (res.data.status){
                this.isFav();
                this.getCompanyById(this.$route.params.id)
              }
            })
            .catch(err=>{
              console.log(err)
            })
      }
    },
    isFav(){
      axios.post('fav/exist/'+this.$route.params.id)
          .then(res=>{
            console.log(res)
            if (res.data.status){
              this.existFav = res.data.data
            }
          })
          .catch(err=>{
            console.log(err)
          })
    },
    changeDialogComment(){
      this.comment.comment = null
      this.comment.rating = 0
      this.dialogComment = !this.dialogComment
    },
    sendMessage () {
      console.log(this.comment )
      axios.post('comment/save/'+this.$route.params.id, this.comment)
      .then(res=>{
        this.reset()
      }).catch(err=>{
        this.reset()
      })
    },
    reset(){
      this.changeDialogComment()
      this.getCompanyById(this.$route.params.id)
      this.validateComment(this.$route.params.id)
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
    getCompanyById(id){
      axios.get('company/find/'+id)
      .then(res=>{
        if (res.data.status){
          this.company.name = res.data.data.name
          this.company.description = res.data.data.description
          this.company.phone = res.data.data.phone
          this.company.comments = res.data.data.comments
          this.company.photos = res.data.data.photos
        }
      })
      .catch(err=>{
      })
    },
    validateComment(id){
      axios.get('comment/valid/'+id)
      .then(res=>{
        console.log(res)
        this.commentExist = res.data.data!=null;
      })
      .catch(err=>{
        this.commentExist = false
        console.log(err.response)
      })
    }
  },
  mounted() {
    this.token = localStorage.getItem("access-token")
    if (this.token){
      this.validateComment(this.$route.params.id)
    }
    this.isFav();
    this.getCompanyById(this.$route.params.id)
  }
}
</script>
