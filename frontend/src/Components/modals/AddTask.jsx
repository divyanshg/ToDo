import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";
import addTask from "../../api/addTask";

let categories = [
  {
    id: 1,
    title: "Personal",
    value: "personal"
  },
  {
    id: 2,
    title: "Home",
    value: "home",
  },
  {
    id: 3,
    title: "Work",
    value: "work"
  }
]

export default function AddTask() {
  const [open, setOpen] = useState(true);

  const cancelButtonRef = useRef(null);

  const taskRef = useRef(null)
  const dateRef = useRef(null)
  const [category, selectCategory] = useState(null)

  const createTask = async () => {
    let task = {
      title: taskRef.current.value,
      dueDate: dateRef.current.value,
      completed: false,
      category
    }

    await addTask(task)
      .then(() => {
        setOpen(false)
        window.location.reload()
      })
      .catch(e => {
        setOpen(false)
      })

  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <Dialog.Title
                        as="h3"
                        className="text-lg leading-6 font-medium text-gray-900"
                      >
                        Add Task
                      </Dialog.Title>
                      <div className="mt-2 flex flex-col space-y-2">
                        <h3 className="font-semibold">What are you upto?</h3>
                        <input
                          type="text"
                          maxLength={100}
                          ref={taskRef}
                          placeholder="Breif text of what you want to accomplish"
                          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-full sm:text-sm"
                        />
                      </div>
                      <div className="mt-2 flex flex-col space-y-2">
                        <h3 className="font-semibold">
                          When do you want to complete it?
                        </h3>
                        <input
                          type="date"
                          pattern="\d{2}-\d{2}-\d{2}"
                          ref={dateRef}
                          placeholder="Breif text of what you want to accomplish"
                          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-full sm:text-sm"
                        />
                      </div>
                      <div className="mt-2 flex flex-col space-y-2">
                        <h3 className="font-semibold">Category</h3>
                        <div className="flex flex-row divide-x w-full border border-gray-200 rounded-lg shadow-sm">
                          {categories.map(({ title, value, id }) => (
                            <div
                              key={id}
                              value={value}
                              className={`px-4 py-2 w-1/3 text-center hover:bg-gray-200 cursor-pointer ${category == value && 'text-white bg-blue-400 hover:bg-blue-600'}`}
                              onClick={() => selectCategory(value)}
                            >
                              {title}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse sm:justify-between">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-1/2 sm:text-sm"
                    onClick={() => createTask()}
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-1/2 sm:text-sm"
                    onClick={() => {
                      setOpen(false);
                    }}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
