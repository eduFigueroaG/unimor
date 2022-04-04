<template>
  <v-container>
    <v-card elevation="4" rounded>
      <v-card-subtitle class="primary white--text">
        <v-icon color="white">mdi-domain</v-icon>  EMPRESAS
      </v-card-subtitle>
      <v-card-text>
        <v-row class="mt-3 mb-1" justify="end">
          <v-col cols="12" class="text-end">
            <v-btn to="/admin/companies/save" class="primary"><v-icon color="white">mdi-plus</v-icon> NUEVA EMPRESA</v-btn>
          </v-col>
        </v-row>
        <v-row class="">
          <v-col cols="12" md="2" lg="2">
            <v-select
                background-color="white"
                dense
                outlined
                :items="select"
                label="Buscar por"
                placeholder="Buscar por"
            ></v-select>
          </v-col>
          <v-col cols="12" md="10" lg="10">
            <v-text-field
                background-color="white"
                dense
                outlined
                append-icon="mdi-magnify"
                label="Buscar"
                placeholder="Buscar"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-data-table
                dense
                style="border: 1px solid lightgrey; margin-top: -20px!important;"
                :headers="headers"
                :items="items"
                :items-per-page="10"
                class="elevation-0"
                hide-default-footer>
              <template v-slot:item.status="{ item }" >
                <div class="text-center">
                  <v-badge :color="item.status?'success':'red'"></v-badge>
                </div>
              </template>
              <template v-slot:item.actions="{ item }" >
                <div v-if="item.status" class="d-inline-flex">
                  <v-tooltip top color="secondary" open-delay="700">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                          :to="'/admin/companies/edit/'+item.id"
                          text
                          dark
                          small
                          color="primary"
                          v-bind="attrs"
                          v-on="on">
                        <v-icon>
                          mdi-pencil
                        </v-icon>
                      </v-btn>
                    </template>
                    <span>Editar</span>
                  </v-tooltip>
<!--                  <v-tooltip top color="secondary" open-delay="700">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                          text
                          dark
                          small
                          color="blue-grey darken-4"
                          v-bind="attrs"
                          v-on="on">
                        <v-icon>
                          mdi-eye
                        </v-icon>
                      </v-btn>
                    </template>
                    <span>Detalles</span>
                  </v-tooltip>-->
                  <v-tooltip top color="secondary" open-delay="700">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                          @click="dialogChange(item.id,  item.status)"
                          text
                          dark
                          small
                          color="red"
                          v-bind="attrs"
                          v-on="on">
                        <v-icon>
                          mdi-delete
                        </v-icon>
                      </v-btn>
                    </template>
                    <span>Eliminar</span>
                  </v-tooltip>
                </div>
                <div v-else class="text-center">
                  <v-tooltip top color="secondary" open-delay="700">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                          @click="dialogChange(item.id, item.status)"
                          text
                          dark
                          small
                          color="red"
                          v-bind="attrs"
                          v-on="on">
                        <v-icon color="success">
                          mdi-check-circle
                        </v-icon>
                      </v-btn>
                    </template>
                    <span>Habilitar</span>
                  </v-tooltip>
                </div>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="6">
            <div class="text-center">
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
      </v-card-text>
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title class="text-h6 text-center justify-center primary white--text">
            {{deleteTitle}}
          </v-card-title>
          <v-card-text class=" text-center mt-4">
            <p>{{deleteDes}}</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="secondary" @click="dialogChange(null)" outlined>Cancelar</v-btn>
            <v-btn color="primary" @click="changeCompanyStatus" >{{deleteAction}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </v-container>

</template>
<script>
import { adminMixin } from "@/modules/admin/mixins";
import axios from "@/plugins/axios";
export default {
  mixins: [adminMixin],
  data(){
    return{
      dialog: false,
      deleteId: null,
      deleteTitle: '',
      deleteDes:'',
      deleteAction: '',
      page: 1,
      itemsPerPage: 10,
      search: '',
      items: [],
      pageCount: 0,
      select: [
        "Name","Phone"
      ],
      headers: [
        { text: 'Nombre', value: 'name', 'width':200, sortable: false },
        { text: 'Telefono', value: 'phone' , sortable: false},
        { text: 'Descripcion', value: 'description',sortable: false},
        { text: 'Estado', value: 'status',sortable: false,align: "center"},
        { text: 'Acciones', value: 'actions', sortable: false, align: "center" },
      ],
    }
  },
  methods:{
    dialogChange(id, status){
      this.dialog = !this.dialog
      this.deleteId = id
      if (status){
        this.deleteTitle = " ¿Estas seguro de deshabalitar esta empresa?"
        this.deleteDes = "La empresa no podra ser consultada por usuarios"
        this.deleteAction = "ELIMINAR"
      }else{
        this.deleteTitle = " ¿Estas seguro de habilitar esta empresa?"
        this.deleteDes = "La empresa volvera a ser consultada por usuarios"
        this.deleteAction = "HABILITAR"
      }
    },
    changeCompanyStatus(){
      axios.put('company/change/'+this.deleteId)
      .then(res=>{
        console.log(res)
        if(res.data.status){
          this.onSuccess("Se modifico el estado de la empresa correctamente")
        }
        this.getCompanies(0,'')
        this.dialogChange(null)
      })
      .catch(err=>{
        console.log(err)
      })
    },
    getCompanies(page, search){
      axios.get('company/all/admin?page='+page)
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
    next(){
      if (this.search === null){
        this.search = ''
      }
      this.getCompanies(this.page-1,"")
    },
  },
  mounted() {
    this.getCompanies(0,"")
  }
}
</script>
