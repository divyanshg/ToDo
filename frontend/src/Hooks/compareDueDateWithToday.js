export const compareDueDateWithToday = (dueDate) => {
    const today = new Date();
    const _dueDate = new Date(dueDate);

    if (today.getDate() === _dueDate.getDate() && today.getMonth() === _dueDate.getMonth()) {
        
        //check if due date is today
        return <span className='font-semibold text-red-400'>Due Today</span>;

    }else if (today.getDate() + 1 === _dueDate.getDate() && today.getMonth() === _dueDate.getMonth()) {

        //check if due date is tomorrow
        return <span className='font-semibold text-yellow-400'>Due Tomorrow</span>;

    }else if (_dueDate.getDate() >= today.getDate() + 7 && today.getMonth() === _dueDate.getMonth()) {
      //check if due date is next week
      return (
        <span className="font-semibold text-yellow-400">Due Next Week</span>
      );
    } else if (today.getTime() > _dueDate.getTime()) {
      //check if overdue
      return (
        <span className="font-semibold text-red-400">
          Overdue ({" "}
          {Math.ceil(
            (today.getTime() - _dueDate.getTime()) / (1000 * 3600 * 24)
          )}{" "}
          days )
        </span>
      );
    } else if (
      _dueDate.getMonth() > today.getMonth() &&
      Math.ceil((_dueDate.getTime() - today.getTime()) / (1000 * 3600 * 24)) >
        30
    ) {
      //return the number of months left
      return (
        <span className="font-semibold text-yellow-400">
          Due in {_dueDate.getMonth() - today.getMonth()} months
        </span>
      );
    } else {
      //return the remaining days
      return (
        <span className="font-semibold text-yellow-400">
          Due in{" "}
          {Math.ceil(
            (_dueDate.getTime() - today.getTime()) / (1000 * 3600 * 24)
          )}{" "}
          days
        </span>
      );
    }
}