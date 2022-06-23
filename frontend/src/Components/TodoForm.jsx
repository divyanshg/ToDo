import React, {useState} from 'react'
import AddTask from './modals/AddTask';

function TodoForm() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-8 space-y-6">
      <div className="rounded-md shadow-sm flex flex-row" onClick={() => setOpen(!open)}>
        <input
          className="bg-white rounded-lg py-3 px-4 block w-full focus:outline-none focus:shadow-outline cursor-pointer"
          disabled={true}
          type="text"
          placeholder="Add a new todo"
        />
      </div>
      {open && <AddTask />}
    </div>
  );
}

export default TodoForm