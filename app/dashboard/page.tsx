"use client";

import React, { useState, useEffect } from "react";
import { useLocalStorageTodos } from "@/hook/useLocalStorageTodos";
import { Todo } from "@/types/todo";
import { Check, Edit2, Trash2, Plus, ClipboardList, CheckCircle, LogOut } from "lucide-react";

import AddTodoModal from "@/cli_components/add-todo-modal";

interface TodoAppClientProps {
  initialTodos?: Todo[];
}

export default function TodoAppClient({ initialTodos = [] }: TodoAppClientProps) {
  const [todos, setTodos] = useLocalStorageTodos();
  const [isInitialized, setIsInitialized] = useState(false);
  const [newTaskInput, setNewTaskInput] = useState("");
  const [filter, setFilter] = useState<"All" | "Pending" | "Completed">("All");

  // Initialize with server-provided todos if localStorage is empty
  useEffect(() => {
    if (!isInitialized && todos.length === 0 && initialTodos.length > 0) {
      setTodos(initialTodos);
      setIsInitialized(true);
    }
  }, [isInitialized, initialTodos, todos, setTodos]);

  const handleAddTodo = (data: { name: string; description: string }) => {
      const newId = (
        todos.length > 0 ? Math.max(...todos.map((t) => parseInt(t.id))) + 1 : 1
      ).toString();
      const newTodoItem: Todo = {
        id: newId,
        content: data.name,
        site_content: data.description,
        completed: false,
      };
      const newTodos = [...todos, newTodoItem];
      setTodos(newTodos);
  };

  const addTodo = () => {
    if (newTaskInput.trim() === "") return;
    handleAddTodo({ name: newTaskInput, description: "" });
    setNewTaskInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  const toggleTodo = (id: string, checked: boolean) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, completed: checked } : todo))
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "Pending") return !todo.completed;
    if (filter === "Completed") return todo.completed;
    return true;
  });

  const completedCount = todos.filter((task) => task.completed).length;
  const pendingCount = todos.filter((task) => !task.completed).length;
  const completionPercentage =
    todos.length > 0
      ? Math.round((completedCount / todos.length) * 100)
      : 0;

  return (
    <>
      <nav className="w-full flex justify-center py-4 px-4 sm:px-10 border-b border-[#29382f]">
        <div className="w-full max-w-[960px] flex items-center justify-between">
          <div className="flex items-center gap-3 text-white">
            <div className="flex items-center justify-center p-2 rounded-full bg-[#36e27b]/20 text-[#36e27b]">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold tracking-tight">Todo App</h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="hidden sm:flex items-center justify-center h-10 px-6 rounded-full bg-[#1c2b24] border border-[#29382f] text-sm font-medium hover:bg-[#29382f] transition-colors text-white">
              <LogOut className="w-5 h-5 mr-2" />
              Log Out
            </button>
            <div
              className="bg-center bg-no-repeat bg-cover rounded-full h-10 w-10 ring-2 ring-[#36e27b]/50"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDJ2xfYG8QQROY5MP--wa4QewnVGj2DVWKKKSNMiio4e79-UPm5DSAvE10LPQaU4t3ZsCUHiUxBRBJ8Ype1jdsVd4568Wdy3KS_Xhr6Ofxd5ZXAwLi_6mVNKvC79HrMb-AfeX2sWJnrBZGcAsSQXY2x91e_fv9Yy6hEOYvxcmItfOd2XqxqWN909tvzB-JE7mFF9cTc7vAv6Qbr6a51Z79DkNksLbSzDXyCQefs-iZ1srKCgqketQ-irEI7s9N1QkeNUN1eKGNgGdvl")',
              }}
            ></div>
          </div>
        </div>
      </nav>
      <main className="w-full max-w-[960px] cursor-default mx-auto px-4 sm:px-10 py-8 flex flex-col gap-8 flex-1 bg-[#112117] min-h-[calc(100vh-80px)] font-sans">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Focus for Today
            </h1>
            <p className="text-[#9eb7a8] text-lg">
              You have {pendingCount} tasks remaining
            </p>
          </div>
          <div className="w-full md:w-64 flex flex-col gap-2">
            <div className="flex justify-between items-center text-sm font-medium">
              <span className="text-white">Daily Goal</span>
              <span className="text-[#36e27b]">{completionPercentage}%</span>
            </div>
            <div className="h-3 w-full bg-[#29382f] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#36e27b] rounded-full transition-all duration-500 ease-out"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="relative w-full group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#36e27b] to-emerald-600 rounded-[20px] blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
          <div className="relative flex items-center bg-[#1c2b24] rounded-[20px] p-2 shadow-none border border-[#29382f]">
            <div className="pl-4 text-gray-400">
              <ClipboardList className="w-6 h-6" />
            </div>
            <input
              className="w-full bg-transparent border-none focus:ring-0 text-lg text-white placeholder-[#9eb7a8] h-14 px-4 focus:outline-none "
              placeholder="What needs to be done?"
              type="text"
              value={newTaskInput}
              onChange={(e) => setNewTaskInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <AddTodoModal onSubmit={handleAddTodo}>
              <button
                className="hidden sm:flex bg-[#36e27b] hover:bg-emerald-400 text-[#112117] font-bold px-8 h-12 rounded-[20px] items-center transition-colors cursor-pointer"
              >
                Add
              </button>
            </AddTodoModal>
            <AddTodoModal onSubmit={handleAddTodo}>
               <button
                className="sm:hidden bg-[#36e27b] hover:bg-emerald-400 text-[#112117] h-12 w-12 flex items-center justify-center rounded-[20px] transition-colors cursor-pointer"
              >
                <Plus className="w-6 h-6" />
              </button>
            </AddTodoModal>
          </div>
        </div>

        <div className="flex justify-center md:justify-start">
          <div className="inline-flex bg-[#29382f] p-1.5 rounded-full role='tablist'">
            {(["All", "Pending", "Completed"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === f
                    ? "bg-[#112117] text-white shadow-sm font-bold"
                    : "text-[#9eb7a8] hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className={`group flex items-center p-4 bg-[#1c2b24] rounded-2xl border border-transparent hover:border-[#36e27b]/30 transition-all shadow-none ${
                todo.completed ? "opacity-75 bg-[#161f1a]" : ""
              }`}
            >
              <label className="relative flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={(e) => toggleTodo(todo.id, e.target.checked)}
                  className="peer h-6 w-6 rounded-full border-2 border-[#9eb7a8] text-[#36e27b] focus:ring-offset-0 focus:ring-0 checked:bg-[#36e27b] checked:border-[#36e27b] transition-all appearance-none cursor-pointer"
                />
                <span className="absolute text-[#112117] opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-opacity duration-200">
                  <Check className="w-4 h-4 font-bold" strokeWidth={4} />
                </span>
              </label>
              <div className="ml-4 flex-1">
                <p
                  className={`text-lg font-medium transition-colors ${
                    todo.completed
                      ? "text-gray-500 line-through"
                      : "text-white"
                  }`}
                >
                  {todo.content}
                </p>
                {!todo.completed && todo.site_content && (
                   <p className="text-xs text-[#36e27b] font-medium mt-0.5">{todo.site_content}</p>
                )}
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 hover:bg-[#29382f] rounded-full text-[#9eb7a8] transition-colors cursor-pointer">
                  <Edit2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="p-2 hover:bg-red-900/20 rounded-full text-[#9eb7a8] hover:text-red-500 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}

          {filteredTodos.length === 0 && (
             <div className="text-center py-10 text-[#9eb7a8]">
                 <p>No tasks found in this filter.</p>
             </div>
          )}
        </div>

        <footer className="w-full max-w-[960px] px-4 sm:px-10 py-6 text-center md:text-left border-t border-[#29382f] mt-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#9eb7a8]">
            <p>
              {pendingCount} pending tasks • {completedCount} completed
            </p>
            <button
              onClick={clearCompleted}
              className="hover:text-[#36e27b] transition-colors cursor-pointer"
            >
              Clear Completed Tasks
            </button>
          </div>
        </footer>
      </main>
    </>
  );
}
