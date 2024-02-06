import conf from '../conf/conf'
import {Client, Account, ID} from "appwrite"


export class AuthService {
    client = new Client()
    account;
    //we are not making new account here because it is wastage of service we will create it when object is formed


    //if we have to change appwrite to any other app(firebase), we just have to make changes to constructor and in try-catch
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client)
    }

    //using async and await in place of promise
    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);

            if(userAccount) {
                //another method --> login of the newly created account
                return this.login({email, password})
            }
            else {
                return userAccount;
            }

        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    //making this method to check if user active or not
    async getCurrentUser() {
        try {
            //if we are not able to get account then it will also return null
            return await this.account.get();
        } catch (error) {
            // throw error ---> we can also log error
            console.log("Appwrite service :: getCurrentUser :: error", error);

        }

        //if there is problem in try-catch 
        return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions()
        } catch (error) {
            // throw error
            console.log('Appwrite service :: logout :: error', error)
        }
    }
}

const authService = new AuthService();

// we are going to export object directly so that user can access its services directly
export default authService