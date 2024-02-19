
import { convertFileToUrl } from "../utils";
import { account, appwriteConfig, avatars, databases, storage } from "./config";
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

export async function signOutAccount(){
    try {
        const session = await account.deleteSession("current");

        return session
    } catch (error) {
        console.log(error);
    }
}

export async function createPost(post){

    try {
        //upload img to storage
        const uploadedFile = await uploadFile(post.file[0])

        if(!uploadedFile) throw Error;
        const fileId = uploadedFile.$id;

        //get file url
        const fileUrl = await getFilePreview(fileId)
       // const fileUrl = convertFileToUrl(getFilePreview(fileId))

        if(!fileUrl) {
            deleteFile(fileId)
            throw Error;}
            
        //convert tags inyo an array
        const tags = post.tags?.replace(/ /g,'').split(',') || [];
        
        //save post to database
        const newPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            ID.unique(),
            {
                creator:post.userId,
                caption:post.caption,
                imageId:fileId,
                location:post.location,
                tags:tags,
                imageUrl: fileUrl,
            }
        )

        if(!newPost){
            await deleteFile(uploadedFile.$id)
            throw Error;
        }
        return newPost;
    } catch (error) {
        console.log("post not created",error);
    }
}

export async function uploadFile(file){
    try {
        const uploadedFile = await storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            file
        );
        return uploadedFile;
    } catch (error) {
        console.log(error);
    }
}

export async function getFilePreview(fileId){
    
   try {
    const fileUrl = storage.getFilePreview (
        appwriteConfig.storageId,
        fileId,
        2000,
        2000,
        "top",
        100
    ) 
    if (!fileUrl) {throw Error}
    else{return fileUrl;}
    
   } catch (error) {
    console.log(error);
   }
}

export async function deleteFile(fileId){
    try {
        await storage.deleteFile(
            appwriteConfig.storageId,
            fileId
        )

        return {status:'ok'}
    } catch (error) {
        console.log(error);
    }
}

