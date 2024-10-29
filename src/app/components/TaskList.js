"use client";
import { useState } from 'react';
import { useTasks, useTasksDispatch } from './TasksContext.js';

export default function TaskList() {
  const tasks = useTasks();
  return (
    <ul style={{ padding: 0 }}>
      {tasks.map(task => (
        <li key={task.id} style={{ marginBottom: '8px', listStyleType: 'none' }}>
          <Task task={task} />
        </li>
      ))}
    </ul>
  );
}

function Task({ task }) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useTasksDispatch();
  let taskContent;
  
  if (isEditing) {
    taskContent = (
      <>
        <input
          value={task.text}
          onChange={e => {
            dispatch({
              type: 'changed',
              task: {
                ...task,
                text: e.target.value
              }
            });
          }} />
        <button
          onClick={() => setIsEditing(false)}
          style={{
            backgroundColor: '#007bff',
            border: 'none',
            color: 'white',
            padding: '4px 10px',
            cursor: 'pointer',
            marginLeft: '5px',
            borderRadius: '4px'
          }}
        >
          Save
        </button>
      </>
    );
  } else {
    taskContent = (
      <>
        {task.text}
        <button
          onClick={() => setIsEditing(true)}
          style={{
            backgroundColor: '#f0f0f0',
            border: '1px solid #ccc',
            color: '#333',
            padding: '4px 10px',
            cursor: 'pointer',
            marginLeft: '5px',
            borderRadius: '4px'
          }}
        >
          Edit
        </button>
      </>
    );
  }

  return (
    <label>
      <input
        type="checkbox"
        checked={task.done}
        onChange={e => {
          dispatch({
            type: 'changed',
            task: {
              ...task,
              done: e.target.checked
            }
          });
        }}
      />
      {taskContent}
      <button
        onClick={() => {
          dispatch({
            type: 'deleted',
            id: task.id
          });
        }}
        style={{
          backgroundColor: '#f0f0f0',
          border: '1px solid #ccc',
          color: '#333',
          padding: '4px 10px',
          cursor: 'pointer',
          marginLeft: '8px', 
          borderRadius: '4px'
        }}
      >
        Delete
      </button>
    </label>
  );
}