import React from 'react'
import TodoForm from "../Components/TodoForm";
import TodoList from "../Components/TodoList";

let options = [
  {
    value: "all",
    label: "All",
    selected: false
  },
  {
    value: "due_today",
    label: "Today",
    selected: true
  },
  {
    value: "due_tomorrow",
    label: "Tomorrow",
    selected: false
  },
  {
    value: "archive",
    label: "Archive",
    selected: false
  }
]

function TodaysTasks() {

  const [selected, setSelected] = React.useState(options[1].value);
  let lastSelected = selected;

  return (
    <div className="min-h-screen flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
            TASKS
          </h2>
        </div>
        <TodoForm />
        <div className="flex flex-row space-x-3">
          {options.map((option) => (
            <div
              key={option.value}
              className={`flex-1 px-2 py-2 rounded-md cursor-pointer text-center shadow-sm ${
                selected == option.value ? "bg-blue-400 text-white font-semibold" : "bg-white"
              }`}
              onClick={() => setSelected(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
        {selected == 'due_today' && <TodoList path={selected} title={"Todays Tasks"}/>}
        {selected == 'due_tomorrow' && <TodoList path={selected} title={"Tomorrow's Tasks"} />}
        {selected == 'all' && <TodoList path={selected} title={"All Tasks"} showDue={true} />}
        {selected == 'archive' && <TodoList path={selected} title={"Archived Tasks"} />}
      </div>
    </div>
  );
}

export default TodaysTasks