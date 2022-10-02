import authResource from "@/resources/auth.resource";

class UsersController{
    async Login(data){
        try {
            let response = await authResource.Login(data);
            let account = {};
            if (response.status){
                account = response.data.account;
                return {
                    status: response.data.status,
                    account,
                };
            }
        } catch (error) {
            console.error(error);
        }
    }
    async Logout(){
        try {
            let response = await authResource.Logout();

            if (response.status){
                return {
                    status: response.data.status,
                };
            }
        } catch (error) {
            console.error(error);
        }
    }
}
export default UsersController;
