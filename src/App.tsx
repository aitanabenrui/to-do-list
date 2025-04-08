import { useState } from 'react' //para importar el hook useState
import './App.css' //para importar el estilo

interface Task { //se define la estructura de un objeto task, que tiene dos propiedades, text e isCompleted
  text: string;
  isCompleted: boolean;
  id: number;
}

function App() { 
  const [taskText, setTaskText] = useState(''); //el estado inicial de taskText es un string vacío
  const [tasks, setTasks] = useState<Task[]>([  //l estado inicial de la lista de tareas es un array con 3 tareas
    {text: 'Tarea 1', isCompleted: false, id: Math.random()},
    {text: 'Tarea 2', isCompleted: true, id: Math.random()}, 
    {text: 'Tarea 3', isCompleted: true, id: Math.random()}
  ]);

  //función que se ejecutará al presionar el botón en "añadir tarea"
const handleAddTask = () => { //esta función usa setTask para añadir una nueva tarea, que se compoondrá del array inicial mas lo que sea task text y false
  setTasks([...tasks, {text: taskText, isCompleted: false, id: Math.random()}]);
  setTaskText(''); //una vez realizado se vuelve a setear setTaskText como un string vacío
}

const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
  setTaskText(event.target.value); //event.target.value obtiene el valor del input y lo actualiza en taskText con setTaskText(event.target.value).
};

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

console.log(taskText);

//implementar currentTask y su función de deleteTask
/* const deleteTask = (taskId: number) => {
  setTasks(currentTasks => {
    return currentTasks
  })
} */

  return (
    <>
      <h1>ToDo List 🖋</h1>
      <div className="add-task">
        <input type='text' onInput={handleInput} value={taskText}/>
        <button className='add-task-button'onClick={handleAddTask} disabled={taskText.length < 4}>Añadir tarea</button>
      </div>
      <div className='task-list'>
        {tasks.map((task, index) => { 
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
