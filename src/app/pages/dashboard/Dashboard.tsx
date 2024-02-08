import { useCallback, useState } from "react";

interface ITask {
    title: string;
    isCompleted: boolean;
    id: number
}

export const Dashboard = () => {
    const [list, setList] = useState<ITask[]>([]);

    const handleInput: React.KeyboardEventHandler<HTMLInputElement> = useCallback((e) => {
        if (e.key === "Enter") {
            if (e.currentTarget.value.trim().length === 0) return;
            const value = e.currentTarget.value;
            setList((old) => {
                if (old.some((item) => item.title === value)) return old;
                return [...old, {
                    title: value,
                    isCompleted: false,
                    id:old.length
                }]
            });
            e.currentTarget.value = "";
        }
    }, []);


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