
import { account, appwriteConfig, avatars, databases } from "./config";
import { ID ,Query} from "appwrite";



export async function createUserAccount({email,password,name,username}){
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            name
        )
        
        if(!newAccount) throw Error;

        const avatarsUrl = avatars.getInitials(name);

        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            name:newAccount.name,
            email:newAccount.email,
            username:username,
            imageUrl:avatarsUrl
        })

       return newUser; 
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function saveUserToDB({
    accountId,
    name,
    email,
    username,
    imageUrl,
}
    
){

    try {
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
           {email,name,imageUrl,username,accountId}
        )

        return newUser;
    } catch (error) {
        console.log(error);
    }
}

export async function signInAccount({email,password}){
    try {
        const session = await account.createEmailSession(email,password)
        return session; 
    }
    catch (error) {
        console.log(error);
    }
}

export async function getCurrentUser(){
    try {
        const currentAccount = await account.get();

        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal("accountId",currentAccount.$id)]
        )

        if(!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
    }
}