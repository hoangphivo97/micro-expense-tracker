//For Frontend
export interface LoginResponse {
  token: string;
}

export interface UserBase {
  uid: string;
  username: string;
  role: string;
  email: string;
  createdAt?: string;
}

export interface UserInDb extends UserBase {
  password?: string;
}

// For FE store in localStorage
export interface UserSession extends UserBase {
  token: string; 
}
