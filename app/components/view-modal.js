'use client'
import { useEffect, useContext } from "react"

export default function ViewModal({myContext}){
    const clickedId = useContext(myContext)
    return(
        <div>
            <p>my id : {clickedId}</p>
        </div>
    )
}