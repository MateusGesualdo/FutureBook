import express from "express";
import loginEndpoint from './endpoints/users/loginEndpoint'
import signupEndpoint from './endpoints/users/signupEndpoint'
import makeFriendshipEndpoint from './endpoints/users/makeFriendshipEndpoint'
import undoFriendshipEndpoint from './endpoints/users/undoFriendshipEndpoint'
import createPostEndpoint from "./endpoints/posts/createPostEndpoint";
import getFeedEndpoint from './endpoints/posts/getFeedEndpoint'
import getFeedByTypeEndpoint from "./endpoints/posts/getFeedByTypeEndpoint";
import addLikeEndpoint from "./endpoints/posts/addLikeEndpoint";
import removeLikeEndpoint from "./endpoints/posts/removeLikeEndpoint";
import addCommentEndpoint from "./endpoints/posts/addCommentEndpoint";
import GUIEndpoint from "./endpoints/GUI/GUIEndpoint";

const app = express()
const cors = require("cors");

app.use(express.json());
app.use(cors())

app.post('/users/signup', signupEndpoint)
app.post('/users/login', loginEndpoint)
app.put('/users/friends/:friendId', makeFriendshipEndpoint)
app.delete('/users/friends/:friendId', undoFriendshipEndpoint)

app.post('/posts', createPostEndpoint)
app.get('/posts/feed', getFeedEndpoint)
app.get('/posts/feed/:type', getFeedByTypeEndpoint)
app.put('/posts/likes/:postId', addLikeEndpoint)
app.delete('/posts/likes/:postId', removeLikeEndpoint)
app.post('/posts/comments/:postId', addCommentEndpoint)

app.get('/', GUIEndpoint)

export default app;
