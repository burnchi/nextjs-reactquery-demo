"use client"
import { useInfiniteQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { todo } from '../type/todo'
import TodoCard from '../components/TodoCard'
import { useInView } from 'react-intersection-observer'

const Infipage = () => {
    const { ref, inView } = useInView();

    const fetchTodos = ({ pageParam }: { pageParam: number }) =>
        fetch(`https://jsonplaceholder.typicode.com/todos?_page=${pageParam}`)
            .then((res) => res.json())

    const {
        data,
        error,
        status,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfiniteQuery({
        queryKey: ['todos'],
        queryFn: fetchTodos,
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            // 如果有最后一页，计算出最后一页的下标，没有返回undefined
            const nextPage = lastPage.length ? allPages.length + 1 : undefined;
            return nextPage;
        },
    })

    // console.log(data);
    // console.log(isFetchingNextPage);
    useEffect(() => {
        if (inView && hasNextPage) {
            console.log('Fire!');
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    const content = data?.pages.map((todos: todo[]) =>
        todos.map((todo, index) => {
            if ( todos.length == index + 1 ) {
                return <TodoCard innerRef={ref} key={todo.id} todo={todo} />;
            }
            // console.log(todo);
            return <TodoCard key={todo.id} todo={todo} />
        })
    );
    if (status === "pending") {
        return <p>Loading...</p>;
    }
    if (status === "error") {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div className=' flex flex-col gap-3'>
            {content}
            {/* <button
                onClick={() => fetchNextPage()}
                className=' p-2 bg-blue-300 text-white w-fit'
                disabled={!hasNextPage || isFetchingNextPage}
                ref={ref}
            > {isFetchingNextPage
                ? 'Loading more...'
                : hasNextPage
                ? 'Load More'
                : 'Nothing more to load'}
                </button> */}
            {isFetchingNextPage
                ? 'Loading more...'
                : hasNextPage
                ? 'scroll down to Load More'
                : 'Nothing more to load'}
        </div>
    )
}

export default Infipage