export type Icon = {
  className?: string;
};

export interface About {
  id: number;
  about: string;
  name: string;
  contacts: {
    github: string;
  };
}

export interface AxiosErrorData {
  statusCode: number;
  message: string;
}

export interface SignUpResponse {
  name: string;
  login: string;
  password: string;
}

export interface SignInResponse {
  token: string;
}

export type LoadingStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface AuthUser {
  userId?: string;
  userName?: string;
  login?: string;
}

export interface User {
  userId: string;
  userName: string;
  login: string;
}

export interface AuthInitialState {
  loginStatus: LoadingStatus;
  registerStatus: LoadingStatus;
}

export interface UserLogin {
  login: string;
  password: string;
}

export interface NewUser {
  name: string;
  login: string;
  password: string;
}

export interface JwtUserData {
  userId: string;
  login: string;
  iat: number;
}

export interface UserInitialState {
  userLoadingStatus: LoadingStatus;
  user: AuthUser;
}
