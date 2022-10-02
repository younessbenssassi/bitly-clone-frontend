<template>
  <div class="createLink">
    <h1>Create short link</h1>
    <div style="margin-top: 20px">
      <el-radio-group
          v-model="link.type"
      >
        <el-radio-button
            :label="0"
        >Short link</el-radio-button>
        <el-radio-button
            :label="1"
        >Expand link
        </el-radio-button>
      </el-radio-group>
    </div>
    <input
        type="text"
        name="original_link"
        :placeholder="link.type === 0 ? 'Enter long URL' : 'Enter short URL'"
        required="required"
        v-model="link.original_link"
    />

    <input
        type="text"
        name="Source"
        placeholder="Source"
        required="required"
        v-model="link.title"
    />

    <button
        type="submit"
        class="btn btn-primary btn-block btn-large"
        @click.prevent="generateLink"
    >
      {{ link.type === 'short' ? 'Generate short link' : 'Generate long link' }}
    </button>

  </div>
</template>

<script>
import LinksController from "@/controllers/LinksController";
export default {
  name: "GenerateLinkPage",
  data(){
    return{
      link:{
        type:0,
        original_link:'',
        title:'',
      }
    }
  },
  methods:{
    async generateLink(){
      const controller = new LinksController();
      const response = await controller.generateLink(this.link);
      if(response.status){
        await this.$router.push({
          name:'Links'
        })
      }
    },
  }
}
</script>
