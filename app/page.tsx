"use client"
import { QueryKey, queryOptions, useQueries, useQuery, useQueryClient } from '@tanstack/react-query'

type User = {
  id: number,
  name: string,
  email: string
}

function groupOptions(id: number) {
  return queryOptions({
    queryKey: ['comments', id],
    queryFn: () => fetchComment(id),
    staleTime: 5 * 1000,
  })
}
// 请求1
const fetchComment = async (id:number) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

export default function Home() {
  // useQuery(groupOptions(1))
  const data = useQueries({
    queries: [groupOptions(1), groupOptions(2)],
  })
  // 如果没有数据或正在等待，返回等待组件
  // if (isLoading || !data) return <div>loading...</div>
  // if (isError) return <div>Something go wrong...</div>
  console.log(data);

  return (
    <div>
      {/* {
        data.map(item => <div key={item.id} className=' space-x-4'>
          <span>{item?.name}</span>
          <span>{item?.email}</span>
        </div>
        )
      } */}
    </div>
  )
}
