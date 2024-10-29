"use client";
import { useState } from 'react';
import { useTasksDispatch } from './TasksContext.js';
 
export default function AddTask() {
  const [text, setText] = useState('');
  const dispatch = useTasksDispatch();
 
  return (
    <>
      <input
        placeholder="Add task"
        value={text}
        onChange={e => setText(e.target.value)}
        style={{
          padding: '5px 10px',
          fontSize: '14px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          marginRight: '8px'
        }}
      />
      <button
        onClick={() => {
          setText('');
          dispatch({
            type: 'added',
            id: nextId++,
            text: text,
          });
        }}
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
        Add
      </button>
    </>
  );
}
 
let nextId = 3;