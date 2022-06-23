import React from 'react'
import { TrashIcon, PencilIcon } from "@heroicons/react/outline";
import {compareDueDateWithToday} from '../Hooks/compareDueDateWithToday';
import ConfirmDelete from './modals/ConfirmDelete'
import updateTask from '../api/updateTask';

function Task({ showDue, _id, title, completed, dueDate, category }) {
    const [displayDeleteModal, setdisplayDeleteModal] = React.useState({show: false, _id: null});
    const [isCompleted, setIsCompleted] = React.useState(completed)

    function handleTaskDelete(_id) {
      setdisplayDeleteModal({show: true, _id: _id});
    }

    function handleStatusChange(){
      if(updateTask(_id, {completed: !isCompleted})){
        setIsCompleted(!isCompleted)
      }else{
        alert("Error updating task")
      }
    }

    return (
      <div className="hover:bg-gray-100 rounded-lg py-2 px-4 block w-full focus:outline-none focus:shadow-outline">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row space-x-3">
            {/* checkbox */}
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={() => handleStatusChange()}
              className={`my-auto h-5 w-5 ${isCompleted && ""}`}
            />
            <div className="flex flex-col">
              <h3
                className={`font-semibold text-lg ${
                  isCompleted ? "text-gray-400 line-through" : "text-black"
                }`}
              >
                {title}
              </h3>
              <h5
                className={`text-xs ${
                  isCompleted && "text-gray-400 font-semibold"
                }`}
              >
                {isCompleted && "Completed"}
                {!isCompleted && showDue && compareDueDateWithToday(dueDate)}
              </h5>
            </div>
          </div>
          <div className="flex flex-row space-x-4">
            <p
              className={`rounded-full px-3 py-1 font-semibold text-sm my-auto text-center ${
                isCompleted
                  ? "text-gray-600 bg-gray-300"
                  : `text-purple-400`
              }`}
            >
              {category.toUpperCase()}
            </p>
            <TrashIcon
              onClick={() => handleTaskDelete(_id)}
              className={`h-5 w-5 my-auto ${
                isCompleted && "text-gray-400"
              } hover:text-red-400 focus:text-red-500 cursor-pointer`}
            />
          </div>
        </div>
        {displayDeleteModal.show && <ConfirmDelete _id={displayDeleteModal._id}/>}
      </div>
    );
}

export default Task