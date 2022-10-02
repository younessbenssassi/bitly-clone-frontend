import linksResource from "@/resources/links.resource";

class LinksController {
    async getLinks(params){
        try {
            let response = await linksResource.getLinks(params);
            let links = [];

            if (response.status){
                links = response.data.links;
                return {
                    status: response.data.status,
                    links,
                };
            }
        } catch (error) {
            console.error(error);
        }
    }
    async getLink(generatedLink){
        try {
            let response = await linksResource.getLink(generatedLink);
            let link = '';

            if (response.status){
                link = response.data.original_link;
                return {
                    status: response.data.status,
                    link,
                };
            }
        } catch (error) {
            console.error(error);
        }
    }
    async generateLink(data){
        try {
            let response = await linksResource.generateLink(data);
            let link = {};

            if (response.status){
                link = response.data.link;
                return {
                    status: response.data.status,
                    link,
                };
            }
        } catch (error) {
            console.error(error);
        }
    }
    async customLink(data,generatedLink){
        try {
            let response = await linksResource.customLink(data,generatedLink);
            let link = {};

            if (response.status){
                link = response.data.link;
                return {
                    status: response.data.status,
                    link,
                };
            }
        } catch (error) {
            console.error(error);
        }
    }
    async deleteLink(generatedLink){
        try {
            let response = await linksResource.deleteLink(generatedLink);
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
export default LinksController;
