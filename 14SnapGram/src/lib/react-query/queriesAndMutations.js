import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery
} from '@tanstack/react-query'

import { createUserAccount, signInAccount, signOutAccount,createPost } from '../appwrite/api'
import { QUERY_KEYS } from './queryKeys'



export const useCreateUserAccount = () =>{
    return useMutation({
        mutationFn: (user) => createUserAccount(user)
    })
}

export const useSignInAccount = () =>{
    return useMutation({
        mutationFn: ({email,password}) => signInAccount({email,password})
    })
}

export const useSignOutAccount = () =>{
    return useMutation({
        mutationFn: signOutAccount
    })
}

export const useCreatePost = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn:(post) => createPost(post),
        onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
            });
        }
    })
  };