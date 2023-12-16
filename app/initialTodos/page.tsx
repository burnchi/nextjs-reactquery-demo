"use client"
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const initialTodospage = () => {

    // Queries
    const { data } = useQuery({
        queryKey: ['todos'],
        queryFn: () => fetch("https://jsonplaceholder.typicode.com/posts/1")
            .then((res) => res.json()),
        // initialData: { id: 1, title: 'ssssssss' }
        placeholderData:{ id: 1, title: 'ssssssss' }
    })
    console.log(data);
    return (
        <div className=' space-x-3'>
            {
                data.id
            }
            <span>     </span>
            {
                data.title
            }
        </div>
    )
}

export default initialTodospage