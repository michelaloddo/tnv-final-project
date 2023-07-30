export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  points: number;
}

  export interface LoginDTO {   
    userId?: number;
    username?: string;
    password?: string;
    email?: string;
    movies?: number;
    points?: number;
}

export interface RegisterDTO {
  userId: number;
  username: string;
  password: string;
  email: string;
}
export interface UserUpdate {
  email: string;
  password: string;
}
