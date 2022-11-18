enum AppRoutes {
  WELCOME = '/',
  AUTH = '/auth',
  BOARDS = '/boards',
  BOARD_ID = ':boardId',
  PROFILE = '/profile',
}

export default AppRoutes;

export const publicRoutes = ['/', '/auth'];
