import { RootState } from 'store/store';

export const selectBoards = (state: RootState) => state.boards;
export const selectLoginStatus = (state: RootState) => state.auth.loginStatus;
export const selectRegisterStatus = (state: RootState) => state.auth.registerStatus;
export const selectUser = (state: RootState) => state.user.user;
export const selectUserLoadingStatus = (state: RootState) => state.user.userLoadingStatus;
export const selectUserUpdatingStatus = (state: RootState) => state.user.userUpdatingStatus;
