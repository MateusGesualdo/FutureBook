class Endpoint {
    constructor(
        public name: string,
        public path: string,
        public method: string,
        public headers: any,
        public body?: any
    ) {
        this.path = "http://localhost:3000" + path
        this.headers["Content-Type"] = "application/json"
    }
}

export const endpoints = [
    new Endpoint(
        "Signup",
        "/users/signup",
        "POST",
        {},
        {
            name: "",
            email: "",
            password: ""
        }),
    new Endpoint(
        "Login",
        "/users/login",
        "POST",
        {},
        {
            "email": "",
            "password": ""
        }),
    new Endpoint(
        "Make Friendship",
        "/users/friends/:friendId",
        "PUT",
        { "auth": "" }
    ),
    new Endpoint(
        "Undo Friendship",
        "/users/friends/:friendId",
        "DELETE",
        { "auth": "" }
    ),
    new Endpoint(
        "Create Post",
        "/posts",
        "POST",
        { "auth": "" },
        {
            "description": "",
            "type": "NORMAL",
            "image": ""
        }
    ),
    new Endpoint(
        "Get Feed",
        "/posts/feed",
        "GET",
        { "auth": "" }
    ),
    new Endpoint(
        "GetFeed By Type",
        "/posts/feed/:type",
        "GET",
        { "auth": "" }
    ),
    new Endpoint(
        "Add Like",
        "/posts/likes/:postId",
        "PUT",
        { "auth": "" }
    ),
    new Endpoint(
        "Remove Like",
        "/posts/likes/:postId",
        "DELETE",
        { "auth": "" }
    ),
    new Endpoint(
        "Add Comment",
        "/posts/comments/:postId",
        "POST",
        { "auth": "" },
        { "commentText": "" }
    )
]