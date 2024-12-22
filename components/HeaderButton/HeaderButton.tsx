import { ITask } from "@/models/Task"
import Image from "next/image"
import { FC } from "react"

interface HeaderButtonProps {
    onClick: (task?: ITask) => void
}


export const HeaderButton: FC<HeaderButtonProps> = ({onClick}) =>{
    return (
        <button
            onClick={() => onClick()}
            className="absolute top-0 transform -translate-y-1/2 text-sm flex justify-center items-center h-12 bg-blue-500  hover:bg-blue-700 text-white font-bold rounded-lg min-w-[545px] max-w-[736px]"
        >
            Create Task
            <span>
            <Image src="/roundPlus.svg" alt="round-plus" width="15" height="15" className="ml-2" />
        </span>
      </button>
    )
}