import React, { useState } from 'react';

const Task = () => {

  const [taskInput, setTaskInput] = useState([]);
  const [taskList, setTaskList] = useState(JSON.parse(localStorage.getItem('task'))||[]);

  const handleTaskList = () => {
    setTaskList([...taskList, taskInput]);
  
    setTaskInput('');
  };
  localStorage.setItem('task', JSON.stringify(taskList));

  return (
    <div>
      <input
        type='text'
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        placeholder='Enter task...'
      />
      <button onClick={handleTaskList}>
        Add Task
      </button>
      <ul>
        { taskList && taskList.map((task) => (
          <div className=''>
            <li>{task}</li>
            <button>Edit</button>
            <button>Delete</button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Task;
