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
            }else {
                setList(result);
            }
         });
    },[]);

    const handleInput: React.KeyboardEventHandler<HTMLInputElement> = useCallback((e) => {
        if (e.key === "Enter") {
            if (e.currentTarget.value.trim().length === 0) return;
            const value = e.currentTarget.value;

            if (list.some((item) => item.title === value)) return;

            TasksService.create( {
                title: value,
                isCompleted: false,
            }).then(result => {
                if (result instanceof ApiException) {
                    console.error(result.message);
                }else {
                    setList((old) => {
                        return [...old, result]
                    });
                }
            });

            
            e.currentTarget.value = "";
        }
    }, [list]);


    return (
        <div>
            <p>List</p>

            <input onKeyDown={handleInput} />

            <p>count items: {list.filter(item => item.isCompleted).length}</p>

            <ul>
                {list.map((item) => {
                    return <li key={item.id}>
                        <input type="checkbox" onChange={() => {
                            setList(old => {
                                return old.map((oldItem) => {
                                    const isSelected = item.title === oldItem.title ? !oldItem.isCompleted : oldItem.isCompleted;
                                    return {
                                        ...oldItem, isSelected
                                    }
                                })
                            })
                        }} checked={item.isCompleted} />
                        {item.title}
                    </li>;
                })}
            </ul>
        </div>
    )
}