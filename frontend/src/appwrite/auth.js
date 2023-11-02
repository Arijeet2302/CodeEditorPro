import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";



export class AuthService {
    client = new Client();    // Creating new client
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);        // Creating new account
            
    }

    async createAccount({email, password, name}) {
        try {                                           // await until account is created
            const userAccount = await this.account.create(ID.unique(), email, password, name); 
            if (userAccount) {
                return this.login({email, password});       // If userAccount is created call login()
            } else {
               return  userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailSession(email, password);  //logged in using the CreateEmailSession()
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();        //Get the currently logged in user.
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {

        try {
            await this.account.deleteSessions();    //Delete all sessions from the user account
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService;


