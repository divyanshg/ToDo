const useTodaysTasks = () => {
    return [{
            id: 1,
            title: "Learn React",
            completed: false,
            dueDate: "2022-06-20",
            category: "Work",
        },
        {
            id: 2,
            title: "Learn Tailwind",
            completed: false,
            dueDate: "2022-07-04",
            category: "Work",
        },
        {
            id: 3,
            title: "Learn TypeScript",
            completed: true,
            dueDate: "2022-06-01",
            category: "Home",
        },
        {
            id: 4,
            title: "Learn GraphQL",
            completed: false,
            dueDate: "2022-06-17",
            category: "Home",
        },
        {
            id: 5,
            title: "Learn Rest API's",
            completed: false,
            dueDate: "2022-09-3",
            category: "Home",
        },
    ];
}

export default useTodaysTasks;