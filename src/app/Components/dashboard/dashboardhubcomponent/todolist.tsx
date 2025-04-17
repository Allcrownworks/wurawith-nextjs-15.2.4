"use client"
import React, { useState } from "react";
import { FiClock } from "react-icons/fi"; // Importing clock icon from react-icons

interface Task {
  id: string;
  name: string;
  label: string;
  checked: boolean;
  animating: boolean;
  timeLabel?: string; // Optional time label property
}

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { 
      id: "dinner-checkbox", 
      name: "dinner", 
      label: "Buy a milk", 
      checked: false, 
      animating: false 
    },
    { 
      id: "shopping-checkbox", 
      name: "shopping", 
      label: "Go to shop and find some products", 
      checked: false, 
      animating: false 
    },
    { 
      id: "shopping-document", 
      name: "document", 
      label: "Send documents to Mike", 
      checked: false, 
      animating: false,
      timeLabel: "1 min" // Added time label for this task
    },
    { 
      id: "smith", 
      name: "smith", 
      label: "Go to the doctor dr Smith", 
      checked: false, 
      animating: false,
    },
    { 
      id: "vacation", 
      name: "vacation", 
      label: "Plan vacation", 
      checked: false, 
      animating: false,
    },
    { 
      id: "stuff", 
      name: "stuff", 
      label: "Create new stuff", 
      checked: false, 
      animating: false,
    },
    { 
      id: " Anna", 
      name: " Anna", 
      label: "Call to Anna for dinner", 
      checked: false, 
      animating: false,
    },
  ]);

  const handleCheckboxToggle = (id: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => {
        if (task.id === id) {
          // Start animation
          setTimeout(() => {
            setTasks(currentTasks => 
              currentTasks.map(t => 
                t.id === id ? {...t, animating: false} : t
              )
            );
          }, 200);
          
          return {
            ...task,
            checked: !task.checked,
            animating: true
          };
        }
        return task;
      })
    );
  };

  return (
    <div className="">
      {tasks.map((task) => (
        <label
          key={task.id}
          htmlFor={task.id}
          className="bg-gray-300 flex gap-2 p-2 cursor-pointer place-items-center rounded-sm m-6"
        >
          <div className="relative place-items-center flex">
            <input
              className={`place-items-center size-5 appearance-none border-1 border-gray-500 rounded checked:bg-blue-500 checked:border-blue-500 transition-colors ${
                task.animating ? "scale-150" : "scale-100"
              } transition-transform duration-200`}
              type="checkbox"
              name={task.name}
              id={task.id}
              checked={task.checked}
              onChange={() => handleCheckboxToggle(task.id)}
            />
            {task.checked && (
              <svg
                className={`absolute inset-0 size-5 pointer-events-none ${
                  task.animating ? "scale-150" : "scale-100"
                } transition-transform duration-200`}
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M5 13l4 4L19 7"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
          <div className="flex items-center justify-between w-full">
            <span>{task.label}</span>
            {task.timeLabel && (
              <div className="flex items-center gap-1 text-gray-500 text-sm">
                <FiClock className="text-gray-500" />
                <span>{task.timeLabel}</span>
              </div>
            )}
          </div>
        </label>
      ))}

   
    </div>
  );
};

export default TodoList;