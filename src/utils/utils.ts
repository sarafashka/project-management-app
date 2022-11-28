import { GetBoardByIdData } from 'types/types';
import errorsTranslate from '../translations/errorsTranslate';

export const findTask = (array: GetBoardByIdData, columnId: string, taskId: string) => {
  return array.columns
    .find((column) => columnId === column.id)
    ?.tasks.find((task) => task.id === taskId);
};

export const findTaskIndex = (array: GetBoardByIdData, columnId: string, taskId: string) => {
  return array.columns
    .find((column) => columnId === column.id)
    ?.tasks.findIndex((task) => task.id === taskId);
};

export const findColumnTasks = (array: GetBoardByIdData, columnId: string) => {
  return array.columns.find((column) => columnId === column.id)?.tasks;
};

export const findColumn = (array: GetBoardByIdData, columnId: string) => {
  return array.columns.find((column) => columnId === column.id);
};

export const findColumnIndex = (array: GetBoardByIdData, columnId: string) => {
  return array.columns.findIndex((column) => columnId === column.id);
};

export const getErrorMessage = (errorMessage: string | undefined, lang: string) => {
  if (errorMessage) {
    return lang === 'en' ? errorMessage : errorsTranslate[errorMessage];
  }
};
