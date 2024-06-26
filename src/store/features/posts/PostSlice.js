import { createSlice, nanoid } from '@reduxjs/toolkit'
import { sub } from 'date-fns'

const initialState = [
    {
        id: '1',
        title: 'Learning Redux Toolkit',
        content: "I've heard good things.",
        date : sub(new Date(),{minutes:10}).toISOString(),
        userId: "0",
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
        }
    },
    {
        id: '2',
        title: 'Learning React',
        content: "I am learning react now",
        date:sub(new Date(),{minutes:5}).toISOString(),
        userId: "1",
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
        }
    }
]



export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state,action) {
                state.push(action.payload)
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
                const obtainedPost = state.find((post) => post.id === postId);
                if (obtainedPost) {
                    obtainedPost.reactions[reaction]++;
                }
            },
        }
    }
})


export const { postAdded,reactionAdded } = postSlice.actions

export const selectAllPosts = state => state.posts

export default postSlice.reducer