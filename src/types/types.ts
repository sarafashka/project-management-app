export type Icon = {
  className?: string;
  contentClassName?: string;
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
  columnsList: ColumnItem[];
  isLoading: boolean;
  error: AxiosErrorData | null;
};

export interface ColumnItem {
  id: string;
  title: string;
  order: number;
}

export interface ColumnDetail extends ColumnItem {
  tasks: TasksInColumn[];
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

export type RequestGetColumn = {
  boardId: string;
  columnId: string;
};

export type RequestUpdateColumn = {
  boardId: string;
  columnId: string;
  body: {
    title: string;
    order: number;
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
  tasksList: GetBoardByIdData;
  isLoading: boolean;
  error: AxiosErrorData | null;
};

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
export type RequestGetTask = {
  boardId: string;
  columnId: string;
  taskId: string;
};
export type RequestDeleteTask = {
  boardId: string;
  columnId: string;
  taskId: string;
};

export type RequestCreateTask = {
  boardId: string;
  columnId: string;
  body: {
    title: string;
    description: string;
    userId: string;
  };
};

export type RequestUpdateTask = {
  boardId: string;
  columnId: string;
  taskId: string;
  body: Omit<Task, 'id'>;
};

export type TaskCreated = Omit<Task, 'order' | 'boardId' | 'columnId'>;

export type TasksInColumn = Omit<Task, 'boardId' | 'columnId'>;
export type OpenModalEvent = React.MouseEvent<HTMLButtonElement | HTMLDivElement>;

export interface BoardData extends CreateBoardData {
  id: string;
}

export interface UpdateBoardData {
  id: string;
  body: CreateBoardData;
}

export type CreateBoardData = {
  title: string;
  description: string;
};

export interface FileData {
  filename: string;
  fileSize: number;
}

export interface GetTaskByIdData {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  files?: FileData[];
}
export type GetBoardByIdTaskData = Omit<GetTaskByIdData, 'boardId' | 'columnId'>;

export interface GetBoardByIdColumnData extends ColumnItem {
  tasks: GetBoardByIdTaskData[];
}
export interface GetBoardByIdData extends BoardData {
  columns: GetBoardByIdColumnData[];
}

export type DataFromEditForm = {
  title: string;
  description?: string;
};

export type SearchData = {
  search: string;
};

export type BoardsSearchQueryParams = {
  titleOrDescriptionParam: string;
};
