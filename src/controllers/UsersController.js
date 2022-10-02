import usersResource from "@/resources/users.resource";

class UsersController{
    async createUser(data){
        try {
            let response = await usersResource.createUser(data);
            if (response.status){
                return {
                    status: response.data.status,
                };
            }
        } catch (error) {
            console.error(error);
        }
    }

    async updateUser(data){
        try {
            let response = await usersResource.updateUser(data);
            if (response.status){
                return {
                    status: response.data.status,
                };
            }
        } catch (error) {
            console.error(error);
        }
    }

    async deleteUser(){
        try {
            let response = await usersResource.deleteUser();
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
