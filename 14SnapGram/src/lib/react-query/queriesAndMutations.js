import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery
} from '@tanstack/react-query'

import { createUserAccount, signInAccount } from '../appwrite/api'



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