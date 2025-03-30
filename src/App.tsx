import { useState } from 'react' //para importar el hook useState
import './App.css' //para importar el estilo

interface Task { //se define la estructura de un objeto task, que tiene dos propiedades, text e isCompleted
  text: string;
  isCompleted: boolean;
}

function App() { 
  const [taskText, setTaskText] = useState(''); //el estado inicial de taskText es un string vacío
  const [tasks, setTasks] = useState<Task[]>([  //l estado inicial de la lista de tareas es un array con 3 tareas
    {text: 'Tarea 1', isCompleted: false},
    {text: 'Tarea 2', isCompleted: true},
    {text: 'Tarea 3', isCompleted: true}
  ]);

  //función que se ejecutará al presionar el botón en "añadir tarea"
const handleAddTask = () => { //esta función usa setTask para añadir una nueva tarea, que se compoondrá del array inicial mas lo que sea task text y false
  setTasks([...tasks, {text: taskText, isCompleted: false}]);
  setTaskText(''); //una vez realizado se vuelve a setear setTaskText como un string vacío
}

const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
  setTaskText(event.target.value); //event.target.value obtiene el valor del input y lo actualiza en taskText con setTaskText(event.target.value).
};

const handleDeleteTask = (index: number) =>{ //filtramos el array para eliminar la tarea en lugar de ocultarla
  setTasks(tasks.filter((_, i) => i !== index)); //como no necesitas el valor de la tarea (solo necesitas el índice), usamos _ para señalar que el valor del elemento no se va a utilizar en esa función
};

//la tarea correcta se actualiza porque el index pasado al onChange le dice a handleCheckboxChange cuál tarea debe cambiar, y luego la comparación i === index en el map() se asegura de modificar solo esa tarea.
const handleCheckboxChange = (index: number) =>{ // i === index se encarga de que se cambie la tarea correcta en el array de tareas
  const updatedTasks = tasks.map((task, i) => i === index ? {...task, isCompleted: !task.isCompleted} : task) //si i es igual al index, se cambia el valor booleano de la tarea completada, si no se deja igual
  setTasks(updatedTasks); //se pasa el índice de la tarea que está cambiando, con la cual hemos interactuado
                          //cuando index coincide con i, cambia esa tarea por completada o no completada según su estado inicial
};

console.log(taskText);

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
              <input type='checkbox' checked={task.isCompleted} onChange={()=>handleCheckboxChange(index)}/>
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
