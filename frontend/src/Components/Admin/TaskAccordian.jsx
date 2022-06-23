import { Fragment, useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import Task from "../Task";
import { UserIcon } from "@heroicons/react/outline";

export default function TaskAccordian({data}) {
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <Fragment>
      {data?.length == 0 && <p>No Tasks</p>}
      {data?.map((user, index) => (
        <Accordion open={open === index+1} onClick={() => handleOpen(index+1)}>
          <AccordionHeader>
            <div className="flex flex-row justify-start sapce-x-4">
              <div className="bg-gray-100 rounded-full py-2 px-2 shadow-sm">
                <UserIcon className="h-5 w-5 my-auto text-black" />
              </div>
              <h3 className="text-2xl font-bold text-center ml-2">
                {user.user}
              </h3>
            </div>
          </AccordionHeader>
          <AccordionBody>
            <div className="w-full">
              {user.tasks.map((task) => (
                <Task showDue={true} {...task} />
              ))}
            </div>
          </AccordionBody>
        </Accordion>
      ))}
    </Fragment>
  );
}
