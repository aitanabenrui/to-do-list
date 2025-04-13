import { ChangeEvent } from 'react';
import { Task } from './task.models';

interface AddTaskProps {
  addTask: (task: Task) => void;
  taskText: string;
  setTaskText: (value: string) => void;
}

export const AddTask = (props: AddTaskProps) => {
  const { addTask, taskText, setTaskText } = props;

  const handleAddTask = () => {
    addTask({ text: taskText, isCompleted: false, id: Math.random() });
    setTaskText('');
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskText(event.target.value);
  };

  return (
    <div className="add-task">
      <input type="text" onChange={handleInput} value={taskText} />
      <button onClick={handleAddTask} disabled={!taskText.trim().length}>
        Añadir tarea
      </button>
    </div>
  );
};