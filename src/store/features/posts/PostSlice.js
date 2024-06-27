import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'
import axios from 'axios'
import { sub } from 'date-fns'

const POST_URL = 'https://jsonplaceholder.typicode.com/posts'

const initialState = {
    posts: [],
    status: 'idle',      //'idle' / 'pending' / 'succeeded' / 'failed'
    error:null
}

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    const response = await axios.get(POST_URL)
    return response.data
})

export const updatePost = createAsyncThunk("posts/updatePosts", async (initialPost) => {
    const { id } = initialPost;
   try {
    const response = await axios.put(`${POST_URL}/${id}`, initialPost)
    return response.data
   } catch (error) {
    return initialPost
   }
})

export const deletePost = createAsyncThunk("posts/deletePosts", async (initialPost) => {
    const { id } = initialPost;
    try {
        const response = await axios.delete(`${POST_URL}/${id}`, initialPost)
        if (response?.status === 200) return initialPost;
        return `${response?.status}: ${response.statusText}`
    } catch (error) {
        console.log(`Error while deleting the post ${error}`)
    }
})



export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state,action) {
                state.posts.push(action.payload)
            },
            prepare(title, content,userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        date: new Date().toISOString(),
                        userId,
                        reactions: {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0
                        }
                    }
                }
            }
        },
        reactionAdded: {
            reducer(state, action) {
                const { postId, reaction } = action.payload;
                const obtainedPost = state.posts.find((post) => post.id === postId);
                if (obtainedPost) {
                    obtainedPost.reactions[reaction]++;
                }
            },
        }
    },
    extraReducers(builder) {
        builder.
            addCase(fetchPosts.pending, (state, action) => {
            state.status = 'pending'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                let min = 1;
                const loadedPosts = action.payload.map((post) => {
                    post.date = sub(new Date(), { minutes: min++ }).toISOString()
                    post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    return post;
                })
                state.posts = state.posts.concat(loadedPosts);
                
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                console.log(action.payload)
                if (!action.payload?.id) {
                    console.log("Error while updating the post")
                    console.log(action.payload)
                }
                
                const { id } = action.payload;
                action.payload.date = new Date().toISOString()
                const posts = state.posts.filter(post => post.id !== id)
                state.posts = [...posts,action.payload]
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                console.log(action.payload.id)
                if (!action.payload?.id) {
                    console.log('Error while deleting the post')
                    console.log(action.payload)
                    return;
                }
                
                const { id } = action.payload;
                const posts = state.posts.filter(post => post.id !== id)
                state.posts = posts
        })
    }
})


export const { postAdded,reactionAdded } = postSlice.actions

export const selectAllPosts = state => state.posts.posts
export const selectPostStatus = state => state.posts.status
export const selectPostsError = state => state.posts.error

export const selectSinglePost = (state, postId) => 
    state.posts.posts.find(post => post.id === postId)

    
export default postSlice.reducer