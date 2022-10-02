<template>
  <div class="sampleContainer">
    <div class="loader">
      <span class="dot dot_1"></span>
      <span class="dot dot_2"></span>
      <span class="dot dot_3"></span>
      <span class="dot dot_4"></span>
    </div>
  </div>
</template>

<script>
import LinksController from "@/controllers/LinksController";
export default {
  name: "RedirectPage",
  methods:{
    async getLink(){
      const controller = new LinksController();
      const response = await controller.getLink(this.$route.params.generated_link);
      if(response.status){
        window.location.href = response.link;
      }else{
        await this.$router.push({
          name:'Error404'
        })
      }
    }
  },
  async beforeMount() {
    await this.getLink();
  }
}
</script>
