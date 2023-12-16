"use client"
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import React from 'react'


export type User = {
    id: number,
    name: string,
    email: string
}

const Pagipage = () => {
    const [page, setPage] = React.useState(1)
    // 查询方法
    const fetchComments = (page = 1) => fetch(`https://jsonplaceholder.typicode.com/comments?postId=${page}`).then((res) => res.json())

    const {
        isPending,
        isError,
        error,
        data,
        isPlaceholderData,
    } = useQuery<User[]>({
        queryKey: ['Comments', page],
        queryFn: () => fetchComments(page),
        placeholderData: keepPreviousData,
        
    })
    console.log(data);

    return (
        <div>
            {/* 第一次请求有闪烁 */}
            {
                isPending ? (
                    <div>Loading...</div>
                ) : isError ? (
                    <div>Error: {error.message}</div>
                ) : (
                    <div>
                        {data.map(item => (
                            <p key={item.id}>{item.name}</p>
                        ))}
                    </div>
                )
            }
            <span>Current Page: {page}</span>
            <div className=' flex gap-3'>

                <button
                    // 最小都为0
                    onClick={() => setPage(old => Math.max(old - 1, 0))}
                    disabled={page === 0}
                    className=' p-2 bg-[#333] text-white/60 disabled:bg-white/40 '
                >
                    Previous Page
                </button>{' '}
                <button
                    onClick={() => {
                        if (!isPlaceholderData ) {
                            setPage(old => old + 1)
                        }
                    }}
                    // Disable the Next Page button until we know a next page is available
                    disabled={isPlaceholderData}
                    className=' p-2 bg-[#333] text-white/60'
                >
                    Next Page
                </button>
            </div>
        </div>
    )
}

export default Pagipage