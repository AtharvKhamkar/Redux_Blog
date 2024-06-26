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
    }
})


export const { postAdded,reactionAdded } = postSlice.actions

export const selectAllPosts = state => state.posts.posts
export const selectPostStatus = state => state.posts.status
export const selectPostsError = state => state.posts.error


export default postSlice.reducer