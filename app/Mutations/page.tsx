"use client"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { addTodo, fetchTodos } from '../api';
import TodoCard1 from '../components/TodoCard1';

const Mutationspage = () => {
    const queryClient = useQueryClient();
    // 如果是查询某个todo，就要用到状态，传入querykey
    // const [search, setSearch] = useState("");
    const [title, setTitle] = useState("");

    const { data: todos, isLoading } = useQuery({
        queryKey: ["todos"],
        // queryKey: ["todos", { search }],
        queryFn: () => fetchTodos(),
        // queryFn: () => fetchTodos(search),
        staleTime: Infinity,
    });

    const { mutateAsync: addTodoMutation } = useMutation({
        mutationFn: addTodo,
        // 提交成功时，刷新一下queryKey缓存
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className=' p-2 border'
                />
                {/* 调用useMutation方法，提交数据 */}
                <button
                    onClick={async () => {
                        try {
                            await addTodoMutation({ title });
                            setTitle("");
                        } catch (e) {
                            console.log(e);
                        }
                    }}
                >
                    Add Todo
                </button>
            </div>
            {/* 渲染useQuery查询的内容 */}
            {todos?.map((todo) => (
                <TodoCard1 key={todo.id} todo={todo} />
            ))}
        </div>
    )
}

export default Mutationspage