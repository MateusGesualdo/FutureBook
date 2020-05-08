# FutureBook

## Endpoints

| Method | Path | Headers | Body | Response |
| ------ | ---- | ------- | ---- | -------- |
| POST | /users/signup | not required | {`name`, `email`, `password`} | {`message`, `token`} |
| POST | /users/login | not required |
| PUT | /users/friends/:friendId |
| DELETE | /users/friends/:friendId | 
| POST | /posts |
| GET | /posts/feed |
| GET | /posts/feed/:type |
| PUT | /posts/likes/:postId |
| DELETE | /posts/likes/:postId |
| POST | /posts/comments/:postId |
