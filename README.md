# FutureBook

## Endpoints

| Method | Path | Headers | Body | Response |
| ------ | ---- | ------- | ---- | -------- |
| POST | /users/signup | not required | must contain `name`, `email` and `password` | contains `message` and (in case od success) `token` |
| POST | /users/login | not required |
| PUT | /users/friends/:friendId |
| DELETE | /users/friends/:friendId | 
| POST | /posts |
| GET | /posts/feed |
| GET | /posts/feed/:type |
| PUT | /posts/likes/:postId |
| DELETE | /posts/likes/:postId |
| POST | /posts/comments/:postId |
