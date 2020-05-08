# FutureBook

```SQL
create table future_book_friends (
    user_id varchar(255),
    friend_id varchar(255),
    primary key(user_id, friend_id),
    foreign key(user_id) references future_book_users(id),
    foreign key(friend_id) references future_book_users(id)
);
```

## Endpoints

| Method | Path | Headers | Body | Response | 
| ------ | ---- | ------- | ---- | -------- |
| POST | /users/signup | not required | `name`, `email`, `password` | `message`, `token?`, `user_public_info?` |
| POST | /users/login | not required | `email`, `password` | `message`, `token?`, `user_public_info?` |
| PUT | /users/friends/:friendId | `auth` | not required | `message` |
| DELETE | /users/friends/:friendId | 
| POST | /posts |
| GET | /posts/feed |
| GET | /posts/feed/:type |
| PUT | /posts/likes/:postId |
| DELETE | /posts/likes/:postId |
| POST | /posts/comments/:postId |
