import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './userSlice';

const useData = (taskList, setTaskList) => {
  const dispatch = useDispatch();

  useEffect(() => {
   
    const sortedTaskList = [...taskList].sort((a, b) => {
      const taskA = a.task.toLowerCase();
      const taskB = b.task.toLowerCase();
      if (taskA < taskB) return -1;
      if (taskA > taskB) return 1;
      return 0;
    });

    setTaskList(sortedTaskList);

  
    dispatch(setUser(sortedTaskList));
  }, [taskList, setTaskList, dispatch]); 

  return null;
};

export default useData;
