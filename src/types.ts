export interface Comment {
  id: string;
  text: string;
  author: string;
  likes: number;
  timestamp: Date;
  replies: Comment[];
}

export interface User {
  id: string;
  name: string;
  avatar: string;
}