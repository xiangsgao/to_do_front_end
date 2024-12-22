"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ITask } from "@/models/Task";
import ApiClient from "@/clients/ApiClient";
import { HeaderButton } from "@/components/HeaderButton/HeaderButton";
import { TaskItem } from "@/components/TaskItem/TaskItem";
import { API_URL } from "@/utils/constants";

const MainPage: React.FC = () => {
  const [taskList, updateTaskList] = useState<ITask[]>([]);
  const navigation = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await ApiClient.get(`${API_URL}/tasks`);
        updateTaskList(response);
      } catch (err) {
        console.error("Failed to load tasks:", err);
      }finally{
        setLoading(false);
      }
    })();
  }, []);

  const handleTaskDeletion = async (taskId: number) => {
    if (window.confirm("Do you want to delete this task?")) {
      try {
        await ApiClient.delete(`${API_URL}/tasks/${taskId}`);
        updateTaskList(taskList.filter((task) => task.id !== taskId));
      } catch (err) {
        console.error("Error deleting task:", err);
      }
    }
  };

  const toggleTaskStatus = async (taskId: number) => {
    try {
      const targetTask = taskList.find((task) => task.id === taskId);
      if (!targetTask) return;

      const updatedTask = await ApiClient.put(`${API_URL}/tasks/${taskId}`, {
        completed: !targetTask.completed,
      });

      updateTaskList(
        taskList.map((task) =>
          task.id === taskId ? { ...task, completed: updatedTask.completed } : task
        )
      );
    } catch (err) {
      console.error("Error updating task status:", err);
    }
  };

  const navigateToTask = (task?: ITask) => {
    const query = task
      ? `?id=${task.id}&title=${task.title}&color=${encodeURIComponent(task.color)}&createdAt=${task.createdAt}&completed=${task.completed}`
      : "";
    navigation.push(`/task${query}`);
  };

  if(loading){
    return (
      <div className="mt-6 text-center text-xl">
        Loading....
      </div>
    )
  }

  return (
    <div className="relative mx-auto pt-20 w-1/2 min-w-[400px] max-w-[736px]">
      <HeaderButton onClick={navigateToTask} />
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <h2 className="font-bold text-primary text-sm">Tasks</h2>
          <span className="ml-2 bg-darkGray px-2 py-0 rounded-full">
            <p className="text-sm text-gray-400">{taskList.length}</p>
          </span>
        </div>
        <div className="flex items-center">
          <h2 className="font-bold text-secondary text-sm">Completed</h2>
          <span className="ml-2 bg-darkGray px-2 py-0 rounded-full">
            <p className="text-sm text-gray-400">
              {taskList.length
                ? `${taskList.filter((task) => task.completed).length} of ${taskList.length}`
                : 0}
            </p>
          </span>
        </div>
      </div>

      {taskList.length === 0 ? (
        <div className="flex flex-col items-center justify-center space-y-4 p-12 border-t border-solid border-darkGray">
          <Image src="/note.svg" alt="note" width={56} height={56} />
          <p className="text-grey font-bold text-base">No tasks available.</p>
          <p className="text-grey text-base">Start creating tasks to manage your to-dos.</p>
        </div>
      ) : (
        <ul className="space-y-4 max-h-[500px] overflow-y-auto">
          {taskList.map((task) => (
            <TaskItem key={task.id} task={task} onDelete={handleTaskDeletion} toTask={navigateToTask}  toggleStatus={toggleTaskStatus} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default MainPage;