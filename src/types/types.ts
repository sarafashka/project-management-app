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
  userId: string;
  userName: string;
  login: string;
}

export interface AuthInitialState {
  user?: AuthUser;
  loginStatus: LoadingStatus;
  registerStatus: LoadingStatus;
}

export interface User {
  login: string;
  password: string;
}

export interface NewUser {
  name: string;
  login: string;
  password: string;
}
export type ColumnState = {
  columns: ColumnItem[];
  isLoading: boolean;
  error: string | null;
};

export interface ColumnItem {
  id: string;
  title: string;
  order: number;
}

export type RequestCreateColumn = {
  boardId: string;
  body: {
    title: string;
  };
};

export type RequestDeleteColumn = {
  boardId: string;
  columnId: string;
};

export type RequestUpdateColumn = {
  boardId: string;
  columnId: string;
  body: {
    title: string;
    order: number | null;
  };
};
