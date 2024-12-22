import { ITask } from "@/models/Task"
import { FC } from "react"
import Image from "next/image"

interface TaskItemProps{
    task: ITask,
    toggleStatus: (id: number) => Promise<void>,
    onDelete: (id: number) => Promise<void>,
    toTask: (task: ITask) => void,
    key: number
}

export const TaskItem: FC<TaskItemProps> = ({task, toggleStatus, onDelete, toTask}) =>{
    return (
        <li
            className="p-4 rounded-lg flex items-center bg-lightDark border border-darkGray"
        >
              {task.completed ? (
                <span
                  className="shrink-0 cursor-pointer"
                  onClick={() => toggleStatus(task.id)}
                >
                  <Image src="/checked.svg" alt="checked" width={18} height={18} />
                </span>
              ) : (
                <span
                  className="rounded-full w-4 h-4 border-2 border-lightBlue shrink-0 cursor-pointer"
                  onClick={() => toggleStatus(task.id)}
                ></span>
              )}
              <span
                className={`ml-2 cursor-pointer ${
                  task.completed ? "text-grey line-through" : "text-white"
                }`}
                onClick={() => toTask(task)}
              >
                {task.title}
              </span>
              <span
                className="ml-auto cursor-pointer shrink-0"
                onClick={() => onDelete(task.id)}
              >
                <Image src="/trash.svg" alt="trash" width={15} height={15} />
              </span>
        </li>
    )
}