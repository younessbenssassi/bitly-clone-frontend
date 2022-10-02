<template>
  <div class="login">
    <h1>Login</h1>
    <p v-if="showEmptyFieldsError" class="text-danger">Please make sure to fill all fields</p>
    <p v-if="showLoginError" class="text-danger">Incorrect email or password</p>
    <input
        v-if="newAccount"
        type="text"
        name="username"
        placeholder="Username"
        required="required"
        v-model="user.username"
    />

    <input
        type="text"
        name="email"
        placeholder="Email"
        required="required"
        v-model="user.email"
    />

    <input
        type="password"
        name="password"
        placeholder="Password"
        required="required"
        v-model="user.password"
    />

    <button
        @click.prevent="handleLoginOrCreateAccount"
        type="submit"
        class="btn btn-primary btn-block btn-large"
    >
      {{ newAccount ? 'Create account' : 'Login' }}
    </button>

    <a
        href="#"
        @click.prevent="newAccount = !newAccount"
    >
      <p>{{ newAccount ? 'Already have an account? Login' : 'New here ? Create new account' }}</p>
    </a>
  </div>
</template>

<script>
import AuthController from "@/controllers/AuthController";
import UsersController from "@/controllers/UsersController";
import {mapActions} from "vuex";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  data(){
    return{
      showEmptyFieldsError:false,
      showLoginError:false,
      newAccount:false,
      user:{
        username:'',
        email:'',
        password:'',
      }
    }
  },
  methods:{
    ...mapActions({
      'setAuthState': 'auth/setAuthState',
    }),
    async handleLoginOrCreateAccount(){
      this.showEmptyFieldsError = false;
      if(!this.user || !this.user.email || !this.user.password || (this.newAccount && !this.user.username)){
        this.showEmptyFieldsError = true;
        return;
      }

      let data = {
        email:this.user.email,
        password:this.user.password,
      };

      if(this.newAccount){
        data.username = this.user.username;
        const controller = new UsersController();
        const response = await controller.createUser(data);
        if(response.status){
          await this.login(data);
        }else {
          this.showEmptyFieldsError = true;
        }
      }else{
        await this.login(data);
      }
    },
    async login(data){
      const controller = new AuthController();
      const response = await controller.Login(data);
      if(response.status){
        await Promise.all([
            this.setAuthState(response.account),
            this.$router.push({
              name:'GenerateLink'
            })
        ]);
      }else {
        this.showLoginError = true;
      }
    }
  }

}
</script>

