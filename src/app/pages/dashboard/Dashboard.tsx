import { useCallback, useEffect, useState } from "react";
import { ITask, TasksService } from "../../shared/services/api/tasks/TasksService";
import { ApiException } from "../../shared/services/api/ApiException";

export const Dashboard = () => {
    const [list, setList] = useState<ITask[]>([]);

    useEffect(() => {
        TasksService.getAll()
            .then((result) => {
                if (result instanceof ApiException) {
                    console.error(result.message)
                } else {
                    setList(result);
                }
            });
    }, []);

    const handleInput: React.KeyboardEventHandler<HTMLInputElement> = useCallback((e) => {
        if (e.key === "Enter") {
            if (e.currentTarget.value.trim().length === 0) return;
            const value = e.currentTarget.value;

            if (list.some((item) => item.title === value)) return;

            TasksService.create({
                title: value,
                isCompleted: false,
            }).then(result => {
                if (result instanceof ApiException) {
                    console.error(result.message);
                } else {
                    setList((old) => {
                        return [...old, result]
                    });
                }
            });


            e.currentTarget.value = "";
        }
    }, [list]);

    const handleToggleComplete = useCallback((id: string) => {
        const task = list.find(task => task.id === id);
        if (!task) return;

        TasksService.update(id, {
            ...task,
            isCompleted: !task.isCompleted
        }).then(result => {
            if (result instanceof ApiException) {
                console.error(result.message)
            } else {
                setList(old => {
                    return old.map((oldItem) => {
                        if (oldItem.id === id) return result;
                        return oldItem;
                    })
                })
            }
        });
    }, [list]);

    const handleDelete = useCallback((id: string) => {
        TasksService.deleteById(id).then(result => {
            if (result instanceof ApiException) {
                console.error(result.message)
            } else {
                setList(old => {
                    return old.filter(oldItem => oldItem.id !== id)
                })
            }
        });
    }, []);

    return (
        <div>
            <p>List</p>

            <input onKeyDown={handleInput} />

            <p>count items: {list.filter(item => item.isCompleted).length}</p>

            <ul>
                {list.map((item) => {
                    return <li key={item.id}>
                        <input type="checkbox" onChange={() => handleToggleComplete(item.id)} checked={item.isCompleted} />
                        {item.title}

                        <button onClick={() => handleDelete(item.id)}>Delete</button>
                    </li>;

                })}
            </ul>

        </div>
    )
}