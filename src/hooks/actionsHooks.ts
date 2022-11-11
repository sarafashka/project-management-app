import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { deleteData } from '../store/boardsSlice';

const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators({ deleteData }, dispatch);
};

export default useActions;
