import { useEffect, useState, useMemo } from 'react' //para importar el hook useState
import './App.css' //para importar el estilo
import { AddTask } from './AddTask';
import { Task } from './task.models';


//ya importada del fichero task.models
/* interface Task { //se define la estructura de un objeto task, que tiene dos propiedades, text e isCompleted
  text: string;
  isCompleted: boolean;
  id: number;
} */

function App() { 
  const [taskText, setTaskText] = useState('');
  const [isOnlyPending, setIsOnlyPending] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([  //l estado inicial de la lista de tareas es un array con 3 tareas
    {text: 'Tarea 1', isCompleted: false, id: Math.random()},
    {text: 'Tarea 2', isCompleted: true, id: Math.random()}, 
    {text: 'Tarea 3', isCompleted: true, id: Math.random()}
  ]);

  console.log(setTaskText);

  const miObjeto = useMemo(() => {
    return {taskText};
  }, []);

  useEffect(() => {
    console.log('holi', miObjeto);
  }, [miObjeto])

const handleDeleteTask = (index: number) =>{ //filtramos el array para eliminar la tarea en lugar de ocultarla
  setTasks(tasks.filter((_, i) => i !== index)); //como no necesitas el valor de la tarea (solo necesitas el índice), usamos _ para señalar que el valor del elemento no se va a utilizar en esa función
};

//la tarea correcta se actualiza porque el index pasado al onChange le dice a handleCheckboxChange cuál tarea debe cambiar, y luego la comparación i === index en el map() se asegura de modificar solo esa tarea.
const handleCheckboxChange = (taskId: number) =>{ // i === index se encarga de que se cambie la tarea correcta en el array de tareas
  const updatedTasks = tasks.map(task => {
    if (task.id === taskId){
      return {
        ...task, isCompleted: !task.isCompleted
      };
    }
    return task;
  });
  setTasks(updatedTasks);
};


//implementar currentTask y su función de deleteTask
/* const deleteTask = (taskId: number) => {
  setTasks(currentTasks => {
    return currentTasks
  })
} */

  const handleIsOnlyPendingClick = () => {
    setIsOnlyPending(!isOnlyPending);
  };

  const addTask = (task: Task) => {
    setTasks([task, ...tasks]);
  };

  const filteredTasks = useMemo(() => {
    return isOnlyPending
    ? tasks.filter((task) => {
      return !task.isCompleted;
    })
    : tasks;
  }, [isOnlyPending, tasks]);

  return (
    <>
      <h1>ToDo List 🖋</h1>
      <AddTask addTask={addTask}/>
      <div className='filters'>
        <button className={isOnlyPending ? `filters__btn--selcted` : ''} onClick={handleIsOnlyPendingClick}>
          Show only pending
        </button>
      </div>
      <div className='task-list'>
        {filteredTasks.map((task, index) => { //repasar esta linea y ver si funciona bien
          // El filter recorre el array tasks y devuelve un nuevo array con solo las tareas donde showTask === true.
          return (
          <div className='task' key={index}> 
            <div>
              {/* el index que le pasamos a handleCheckboxChange proviene del .map(), cuando se pasa el index a handleCheckboxChange, se pasa la posición de la tarea dentro del array. */}
              <input type='checkbox' checked={task.isCompleted} onChange={()=>handleCheckboxChange(task.id)}/>
              <span style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>{task.text}</span>
            </div>
            <button onClick ={() => handleDeleteTask(index)}>Eliminar</button>
          </div>
          );
        })}
      </div>
    </>
  )
}

export default App
