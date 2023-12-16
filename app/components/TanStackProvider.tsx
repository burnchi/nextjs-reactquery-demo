"use client"
import React, { useState } from 'react'
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const TanStackProvider = ({ children }: { children: React.ReactNode }) => {
    const [queryClient, setQueryClient] = useState(()=>new QueryClient())
    return (
        <QueryClientProvider client={queryClient} >
            {children}
            {/* 调试工具 */}
            <ReactQueryDevtools initialIsOpen></ReactQueryDevtools>
        </QueryClientProvider>
    )
}

export default TanStackProvider