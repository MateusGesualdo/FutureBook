# FutureBook



## SQL Database Setup
```SQL
CREATE TABLE future_book_users (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) UNIQUE
);
```
```SQL
CREATE TABLE future_book_friends (
    user_id VARCHAR(255),
    friend_id VARCHAR(255),
    PRIMARY KEY (user_id , friend_id),
    FOREIGN KEY (user_id) REFERENCES future_book_users (id),
    FOREIGN KEY (friend_id) REFERENCES future_book_users (id)
);
```
```SQL
CREATE TABLE future_book_posts (
    id VARCHAR(255) PRIMARY KEY,
    author_id VARCHAR(255),
    description VARCHAR(255),
    creation_date DATETIME,
    type VARCHAR(255),
    img VARCHAR(255),
    FOREIGN KEY (author_id) REFERENCES future_book_users (id)
);
```
```SQL
CREATE TABLE future_book_likes (
    friend_id VARCHAR(255),
    post_id VARCHAR(255),
    PRIMARY KEY (friend_id , post_id),
    FOREIGN KEY (friend_id) REFERENCES future_book_users (id),
    FOREIGN KEY (post_id) REFERENCES future_book_posts (id)
);
```




