<template>
  <div class="LinksListing">
    <el-table
        :data="links"
        tooltip-effect="dark"
        style="width: 100%">
      <el-table-column
          label="Title"
          prop="title"
          width="180"
      >
        <template slot-scope="scope">
          <div v-if="showEdit && selectedLinkId === scope.row.id">
            <input
                v-model="title"
                type="text"
                placeholder="Title"
            />
          </div>
          <span
              v-else
          >
            {{ scope.row.title }}
          </span>

        </template>
      </el-table-column>

      <el-table-column
          label="Generated link"
          prop="generated_link"
          width="500"
      >
        <template slot-scope="scope">
          <span v-if="showEdit && selectedLinkId === scope.row.id">
            <p v-if="showError" class="text-danger">Custom link already used</p>
            http://localhost:8080/
            <input
                style="width: auto"
                v-model="generated_link"
                type="text"
                placeholder="Title"
            />
          </span>
          <span
              v-else
          >
            http://localhost:8080/{{ scope.row.generated_link }}
          </span>

        </template>
      </el-table-column>
      <el-table-column
          label="Visitors"
          prop="visitors"
          width="100"
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
          <template v-if="showEdit && selectedLinkId === scope.row.id">
            <el-button
                size="mini"
                @click="customLink(scope.row.generated_link)"
            >
              Save
            </el-button>
            <el-button
                size="mini"
                @click="handleEditToggle(scope.row)"
            >
              Cancel
            </el-button>
          </template>
          <template v-else>
            <el-button
                size="mini"
                @click="handleEditToggle(scope.row)"
            >
              Edit
            </el-button>
            <el-button
                size="mini"
                type="danger"
                @click="handleDeleteLink(scope.row)"
            >
              Delete
            </el-button>
          </template>

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
  name: "CustomLinksPage",
  data(){
    return{
      links:[],
      search:'',
      title:'',
      generated_link:'',
      showError:false,
      showDelete:false,
      selectedLink:null,
      showEdit:false,
      selectedLinkId:null,
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
    async customLink(generated_link){
      this.showError = false;
      const controller = new LinksController();
      let data = {
        title:this.title,
        generated_link:this.generated_link,
      }
      let response = await controller.customLink(data,generated_link);
      if(response.status){
        let linkIndex = null;
        this.links.forEach((link,index)=>{
          if(link.id === response.link.id){
            linkIndex = index;
            return 0;
          }
        })
        if(this.links[linkIndex]){
          this.$set(this.links, linkIndex, response.link);
          this.handleEditToggle(this.links[linkIndex]);
        }
      }else{
        this.showError = true;
      }
    },
    handleEditToggle(link){
      if(this.selectedLinkId === link.id){
        this.showEdit = false;
        this.selectedLinkId = null;
        this.title = '';
        this.generated_link = '';
      }
      else{
        this.showEdit = true;
        this.selectedLinkId = link.id;
        this.title = link.title;
        this.generated_link = link.generated_link;
      }
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
        });
        this.cancelDeleteLink();
      }
    },
  },
  async mounted(){
    await this.getLinks();
  }
}
</script>
