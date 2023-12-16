"use client"
import Link from 'next/link'


const pageItems = ['pagination', 'InfiniteQueries', 'initialTodos', 'Mutations']

export default function Home() {

  return (
    <div className=' space-x-4'>
      {pageItems.map(
        item => <Link href={`/${item}`} key={item}
          className=' p-2 bg-[#333] text-white/60 disabled:bg-white/40 '
        >
          {item} page
        </Link>
      )
      }
    </div>
  )
}
