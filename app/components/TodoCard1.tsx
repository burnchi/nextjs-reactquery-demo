import { useState } from "react";
import { Todo } from "../type/todo";

interface TodoProps {
    todo: Todo;
}

export default function TodoCard1({ todo }: TodoProps) {
    const [checked, setChecked] = useState(todo.completed);

    return (
        <div>
            {todo.title}
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
            />
        </div>
    );
}