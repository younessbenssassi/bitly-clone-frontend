<template>
  <div class="LinksListing">
    <el-table
        :data="links"
        tooltip-effect="dark"
        style="width: 100%">
      <el-table-column
          label="Title"
          prop="title"
      >
      </el-table-column>
      <el-table-column
          label="Generated link"
          prop="generated_link"
      >
        <template slot-scope="scope">
          http://localhost:8080/{{ scope.row.generated_link }}
        </template>
      </el-table-column>
      <el-table-column
          label="Visitors"
          prop="visitors"
      >
      </el-table-column>
      <el-table-column
          align="right"
      >
        <template slot="header">
          <input
              v-model="search"
              size="mini"
              placeholder="Type to search"
              @input="handleSearch"

          />
        </template>
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="danger"
              @click="handleDeleteLink(scope.row)"
          >
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
        title="Confirmation model"
        :visible.sync="showDelete"
        width="30%"
        :before-close="cancelDeleteLink"
    >
      <span>Are you sure to want to delete this link?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click.prevent="cancelDeleteLink">Cancel</el-button>
        <el-button type="primary" @click.prevent="deleteLink">Delete</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import LinksController from "@/controllers/LinksController";
export default {
  name: "LinksPage",
  data(){
    return{
      links:[],
      search:'',
      showDelete:false,
      selectedLink:null,
    }
  },
  methods:{
    async getLinks(search = ''){
      const controller = new LinksController();
      let response = await controller.getLinks({search});
      if(response.status){
        this.links = response.links;
      }
    },
    async handleSearch(){
      if(this.search.length > 2 || !this.search)
        await this.getLinks(this.search);
    },
    cancelDeleteLink(){
      this.showDelete = false;
      this.selectedLink = null;
    },
    handleDeleteLink(link){
      this.showDelete = true;
      this.selectedLink = link;
    },
    async deleteLink(){
      const controller = new LinksController();
      let response = await controller.deleteLink(this.selectedLink.generated_link);
      if(response.status){
        this.links.forEach((link,index)=>{
          if(link.id === this.selectedLink.id){
            this.links.splice(index,1);
            return 0;
          }
        })
        this.cancelDeleteLink();
      }
    },
  },
  async mounted(){
    await this.getLinks();
  }
}
</script>
