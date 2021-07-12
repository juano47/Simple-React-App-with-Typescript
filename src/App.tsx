import React, {useState, useRef} from 'react';
import './App.css';

type FormElement = React.FormEvent<HTMLFormElement>;

interface ITask {
    name: string;
    done: boolean;
}

function App() {

    const [newTask, setNewTask] = useState<string>('');
    const [tasks, setTasks] = useState<ITask[]>([]);
    const taskInput = useRef<HTMLInputElement>(null);

    const handleSubmit = (event: FormElement) => {
        event.preventDefault()
        addTask(newTask)
        setNewTask("")
        taskInput.current?.focus();
    }

    const addTask = (name: string) => {
        const newTasks: ITask[] = [...tasks, {name, done: false}]
        setTasks(newTasks)
    }

    const toggleDoneTask = (i: number) => {
        const newTasks: ITask[] = [...tasks];
        newTasks[i].done = !newTasks[i].done;
        setTasks(newTasks)
    }

    const removeTask = (i: number) => {
        const newTasks: ITask[] = [...tasks];
        newTasks.splice(i,1);
        setTasks(newTasks)
    }


    return (
        <div className='container p-4'>
            <div className='row'>
                <div className='col-md-6 offset-mb3'>
                    <div className='card'>
                        <div className='card-body'>
                            <form onSubmit={handleSubmit}>
                                <input className="form-control"
                                       type="text"
                                       autoFocus
                                       ref={taskInput}
                                       onChange={event => setNewTask(event.target.value)}
                                       value={newTask}/>
                                <button className='btn btn-success btn-block mt-2'>
                                    Save
                                </button>
                            </form>
                            {tasks.map((task: ITask, index) =>
                                <div className='card card-body mt-2' key={index}>
                                    <h3 style={{textDecoration: task.done? 'line-through' : ''}}>{task.name}</h3>
                                    <div>
                                        <button className='btn btn-secondary' onClick={() => toggleDoneTask(index)}>
                                            {task.done? 'Revoke' : 'Done'}
                                        </button>
                                        <button className='btn btn-danger' onClick={() => removeTask(index)}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default App;
