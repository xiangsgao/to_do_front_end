"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { ITask } from "@/models/Task";
import { API_URL } from "@/utils/constants";
import ApiClient from "@/clients/ApiClient";

const COLOR_CHOICES = [
  "#FF4D4D",
  "#FFA726",
  "#FFE066",
  "#28A745",
  "#0056E0",
  "#6B52C7",
  "#B569E8",
  "#FF4C68",
  "#9C8568",
];

const TaskEditor: React.FC = () => {
  const router = useRouter();
  const queryParams = useSearchParams();

  const [taskDetails, setTaskDetails] = useState<ITask>({
    id: Number(queryParams.get("id")) ?? 0,
    title: queryParams.get("title") ?? "" ,
    color: decodeURIComponent(queryParams.get("color") ?? COLOR_CHOICES[0]),
    completed: queryParams.get("completed") === "true",
    createdAt: queryParams.get("createdAt") ?? "",
    updatedAt: "",
  });


  const updateField = (key: keyof ITask, value: string | boolean) => {
    setTaskDetails((prev) => ({ ...prev, [key]: value }));
  };

  const saveTask = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const endpoint = taskDetails.id
        ? `${API_URL}/tasks/${taskDetails.id}`
        : `${API_URL}/tasks`;
      const handler = taskDetails.id ? ApiClient.put : ApiClient.post;
      await handler(endpoint, {
        title: taskDetails.title,
        color: taskDetails.color,
        completed: taskDetails.completed,
      });
      router.push("/");
    } catch (e) {
      console.error(e);
      alert(`Error occured`);
    }
  };

  return (

    <div className="max-w-lg mx-auto mt-12 px-4">

      <div className="mb-4">
        <button
          onClick={() => router.push("/")}
          className="flex items-center text-blue-500 hover:underline"
        >
          <Image src="/arrow-left.svg" alt="Back" width={20} height={20} />
          <span className="ml-2">Back to List</span>
        </button>
      </div>

      <form onSubmit={saveTask} className="space-y-8">
        <div>
          <label htmlFor="task-title" className="block mb-2 font-medium">
            Task Title
          </label>
          <input
            id="task-title"
            type="text"
            value={taskDetails.title}
            onChange={(e) => updateField("title", e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400"
            placeholder="Enter task title"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Select Color</label>
          <div className="flex gap-3">
            {COLOR_CHOICES.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => updateField("color", color)}
                className={`w-10 h-10 rounded-full`}
                style={{
                  backgroundColor: color,
                  border: color === taskDetails.color ? "2px solid white" : "none",
                }}
                aria-label={`Color ${color}`}
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 text-center font-bold text-white bg-blue-500 rounded-md hover:bg-blue-700"
        >
          {taskDetails.id ? "Update Task" : "Create Task"}
        </button>
      </form>
    </div>
  );
};

export default TaskEditor;
