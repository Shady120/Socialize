
export interface PostData{
    _id:string,
    body:string|null,
    image:string,
    user:User,
    createdAt:string,
    comments:Comments[]
}

interface User {
    _id: string,
    name: string,
    photo: string,
}

export interface Comments {
    _id: string,
    content:string,
    commentCreator:User,
    post:string,
    createdAt:string,
}

export interface Post {
  _id: string;
  body: string;
  image: string;
  user: User;
  createdAt: string;
  comments: Comments[];
}