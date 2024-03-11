
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

export async function getRecentPosts(){
    const posts = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        [Query.orderDesc('$createdAt'),Query.limit(20)]
    )

    if(!posts) throw Error;

    return posts;
}

export async function likePost(postId, likesArray){
    try {
        const updatedPost = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            postId,
            {
                likes:likesArray
            }
        )

        if(!updatedPost ) throw Error;
        return updatedPost

    } catch (error) {
        console.log(error);
    }
}

export async function savePost(postId,userId){
    try {
        const updatedPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.savesCollectionId,
            ID.unique(),
            {
                user:userId,
                post:postId
            }
        )

        if(!updatedPost ) throw Error;
        return updatedPost
        
    } catch (error) {
        console.log(error);
    }
}

export async function deleteSavePost(savedRecordId){
    try {
        const statusCode = await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            savedRecordId,
        )

        if(!statusCode ) throw Error;
        return {status:'ok'}
        
    } catch (error) {
        console.log(error);
    }
}

export async function getPostById(postId){
    try {
        const post = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            postId
        )

        return post;
    } catch (error) {
        console.log(error);
    }
}

export async function updatePost(post){

    const hasFileToUpdate = post.file.length > 0;

    try {
        let image = {
            imageUrl: post.imageUrl,
            imageId :post.imageId,

        }

        if(hasFileToUpdate){
            
            //upload img to storage
            const uploadedFile = await uploadFile(post.file[0])
            if(!uploadedFile) throw Error;
            const fileId = uploadedFile.$id;
            //get file url
            const fileUrl = await getFilePreview(fileId)
           // const fileUrl = convertFileToUrl(getFilePreview(fileId))
           if(!fileUrl) {
               deleteFile(fileId)
               throw Error;
            }

            image = {...image, imageUrl:fileUrl, imageId:uploadedFile.$id}
        }
               
            //convert tags inyo an array
            const tags = post.tags?.replace(/ /g,'').split(',') || [];
            
            //save post to database
            const updatedPost = await databases.updateDocument(
                appwriteConfig.databaseId,
                appwriteConfig.postCollectionId,
                post.postId,
                {
                    caption:post.caption,
                    imageId:image.imageId,
                    location:post.location,
                    tags:tags,
                    imageUrl: image.imageUrl,
                }
            )
    
            if(!updatedPost){
                await deleteFile(post.imageId)
                throw Error;
            }
            return updatedPost;

        } catch (error) {
            console.log("post not created",error);
        }
    }

export async function deletePost(postId,imageId){
    if(!postId || !imageId) throw Error

    try {
        await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            postId
        )

        return {status:'ok'}
    } catch (error) {
        console.log(error);
    }
}    

export async function getInfinitePosts({pageParam}){
    const queries = [Query.orderDesc("$updatedAt"), Query.limit(10)];

    if(pageParam){
        queries.push(Query.cursorAfter(pageParam.toString()));
    }

    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            queries
        )
        
        if(!posts) throw Error;
        
        return posts;

    } catch (error) {
        console.log(error);
    }
}

export async function searchPosts({searchTerm}){

    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            [Query.search('caption',searchTerm)]
        )

        if(!posts) throw Error;
        
        return posts;
        
    } catch (error) {
        console.log(error);
    }
}

export async function getInfiniteUsers({pageParam}){
    const queries = [Query.limit(20)];

    if(pageParam){
        queries.push(Query.cursorAfter(pageParam.toString()))
    }
    try {
        const users = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            queries,
        )

        if(!users) throw Error;

        return users;
    } catch (error) {
        console.log(error);
    }
}
