import { configureStore } from '@reduxjs/toolkit'
import postReducer from "../store/features/posts/PostSlice"
import userReducer from "../store/features/users/Userslice"

export const store = configureStore({
    reducer: {
        posts: postReducer,
        users:userReducer
        
    }
})


