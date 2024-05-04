import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useData from '../utils/useData';

const Task = () => {
  const [taskInput, setTaskInput] = useState('');
  const [taskList, setTaskList] = useState(() => {
    const storedTasks = localStorage.getItem('task');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const selector = useSelector((store) => store?.user?.user);

  const handleTaskList = () => {
    if (taskInput.trim() === '') {
      return;
    }
    const newTask = {
      id: Date.now(),
      task: taskInput.trim(),
      done: false 
    };
    const updatedTaskList = [...taskList, newTask];
    setTaskList(updatedTaskList);
    setTaskInput('');
    localStorage.setItem('task', JSON.stringify(updatedTaskList));
  };

  const handleDelete = (id) => {
    const updatedTaskList = taskList.filter((task) => task.id !== id);
    setTaskList(updatedTaskList);
    localStorage.setItem('task', JSON.stringify(updatedTaskList));
  };

  const handleDone = (id) => {
    const updatedTasks = taskList.map((task) => {
      if (task.id === id) {
        return { ...task, done: !task.done }; 
      }
      return task;
    });
    setTaskList(updatedTasks);
    localStorage.setItem('task', JSON.stringify(updatedTasks));
  };

  // Call the useData hook with taskList and setTaskList
  useData(taskList, setTaskList);

  return (
    <div className='flex flex-col justify-center items-center m-5'>
      <div className='mb-4'>
        <input
          type='text'
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder='Enter task...'
          className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
        />
        <button
          onClick={handleTaskList}
          className='ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
        >
          Add Task
        </button>
      </div>
      <ul className='w-full'>
        <h1>Data is Sorted</h1>
        {selector && Array.isArray(selector) ? (
          selector.map((task, index) => (
            <li
              key={task.id}
              className={`flex items-center justify-between py-2 px-4 border-b border-gray-300 w-full ${task.done ? 'line-through text-gray-400' : ''}`}
            >
              <span>{task.task}</span>
              <div>
                <button
                  onClick={() => handleDone(task.id)} 
                  className='text-sm text-blue-500 hover:text-blue-700 focus:outline-none mr-2'
                >
                  {task.done ? 'Undo' : 'Done'}
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className='text-sm text-red-500 hover:text-red-700 focus:outline-none'
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <li>No tasks available</li>
        )}
      </ul>
    </div>
  );
};

export default Task;
