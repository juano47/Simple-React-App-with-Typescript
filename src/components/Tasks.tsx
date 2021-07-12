import React from "react";



export const Tasks = (tasks:any) => {


    return (
            tasks.task.map((task:any) => {
                return <p key={task.id}>
                    {task.title} - {task.description} - {task.done}</p>
            })
        );

}
