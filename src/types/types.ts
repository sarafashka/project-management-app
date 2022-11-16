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

export interface User {
  id: string;
  name: string;
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

export interface ColumnDetail extends ColumnItem {
  tasks: TasksInColumn[];
}

export type TasksInColumn = {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  files?: string[];
};

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

export type RequestGetColumn = {
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

export interface JwtUserData {
  userId: string;
  login: string;
  iat: number;
}

export interface UserInitialState {
  userLoadingStatus: LoadingStatus;
  userUpdatingStatus: LoadingStatus;
  user: User;
}

export type TaskState = {
  tasksList: ColumnDetail[];
  isLoading: boolean;
  error: string | null;
};

// export type TaskState = {
//   tasks: Task[];
//   isLoading: boolean;
//   error: string | null;
// };

export interface Task {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  files?: string[];
}

export type RequestGetAllTasks = {
  boardId: string;
  columnId: string;
};
