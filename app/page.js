'use client'

import { useEffect, useState } from "react";
import TodoList from "./components/list";
import SearchBox from "./components/search";
import { Outfit } from "next/font/google";

const outfit_font = Outfit({subsets:['latin'], weight:['400']})

const myTodos = async () => {
  const todos = await fetch("https://66bec44542533c403143fe01.mockapi.io/api/user-list")
  if (!todos) {
    throw new error("Can't fetch api")
  }

  return todos.json()
}

export default function Home() {
  const [data, setData] = useState([])
  const [filter, setFilter] = useState(null)
  const initData = async () => {
    try{
      const result = await myTodos()
      setData(result)
    }catch(error){
      console.log(error)
    }
  }
  useEffect(() => {
    initData()
  }, [data])
  return (
    <div className={`bg-gradient-to-br from-pink-600  to-blue-700 select-none w-full h-fit min-h-screen grid grid-cols-1 justify-items-center gap-5 ${outfit_font.className}`}>
      <h1>My To-do List or what do you want to add (Anything{`><`})</h1>
      <SearchBox data={data} setFilter={setFilter} />
      <TodoList data={data} filter={filter} />
    </div>
  );
}
