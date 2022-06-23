import Task from './Task';
import { useState, useEffect } from "react";
import getTodos from '../api/getTodos';
import PreLoader from './PreLoader'

function TodoList({title, path, showDue}) {

  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    (async() => {
        let _tasks = await getTodos(path);
        setTasks(_tasks)
        setIsLoading(false)
    })()
  }, [])

  return (
    <div className="mt-4 space-y-6">
      <h2 className="text-xl font-semibold -mb-4">{title}</h2>
      <div className="rounded-md -space-y-px bg-white space-y-4 shadow-sm p-3 min-h-24">
        {isLoading && <PreLoader />}
        {!isLoading && tasks.length == 0 && <h2 className='mx-auto text-lg text-gray-400 font-semibold'>No Tasks</h2>}
        {!isLoading &&
          tasks?.map((task) => (
            <Task key={task._id} showDue={showDue} {...task} />
          ))}
      </div>
    </div>
  );
}

export default TodoList