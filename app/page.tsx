"use client";

import {Progress} from "@/components/ui/progress";
import Check from "@/icons/checked";
import {Input} from "@/components/ui/input";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import NoteCards from "@/cli_components/note-cards"
import {useLocalStorageTodos} from "@/hook/useLocalStorageTodos";
import React from "react";
import { Todo } from "@/types/todo";
import AddTodoModal from "@/cli_components/add-todo-modal";

export default function Home() {
    const [todos, setTodos] = useLocalStorageTodos();

    // Debug: Log when todos change
    React.useEffect(() => {
        console.log("Todos updated:", todos.length, "items");
        console.log("LocalStorage value:", localStorage.getItem("todos"));
    }, [todos]);

    const addTodo = (data: { name: string, description: string }) => {
        if (data.name.trim() === "") return;
        const newId = (todos.length > 0 ? Math.max(...todos.map(t => parseInt(t.id))) + 1 : 1).toString();
        const newTodoItem: Todo = {
            id: newId,
            content: data.name,
            site_content: data.description,
            completed: false
        };
        const newTodos = [...todos, newTodoItem];
        setTodos(newTodos);
        console.log("Added new todo:", newTodoItem);
        console.log("Total todos:", newTodos.length);
    }

    const handleCheckboxChange = (id: string, checked: boolean) => {
        setTodos(todos.map((todo) => todo.id === id ? { ...todo, completed: checked } : todo));
    }

    return (
        <div className="min-h-screen px-20 py-5 justify-start font-sans bg-green-950">
            <h1 className="text-4xl font-extrabold text-white mb-2"> Focus for Today</h1>
            <div className="max-w-screen flex justify-between text-white">
                <p className="text-gray-500">You have {todos.filter(task => !task.completed).length} remaining</p>
                <div className="">
                    <div className="flex gap-32 mb-2">
                        <p className="font-bold">Daily Goal</p>
                        <p className="font-bold text-green-600">{todos.length > 0 ? Math.round(todos.filter(task => task.completed).length / todos.length * 100) : 0}%</p>
                    </div>
                    <Progress value={todos.length > 0 ? Math.round(todos.filter(task => task.completed).length / todos.length * 100) : 0} className="bg-gray-700" indicatorClassName="bg-lime-600"/>
                </div>
            </div>
            <div className="mt-7 flex justify-between border border-gray-700 p-4 rounded-2xl shadow-lg/20 shadow-green-700 mb-4">
                <div className="flex ">
                    <Check width={32} height={32} className="text-gray-400 gap-3" />
                    <Input className="border-none text-white max-w-full" placeholder="What needs to be done?" disabled />
                </div>
                <AddTodoModal onSubmit={addTodo}/>
            </div>
            <Tabs defaultValue="All">
                <TabsList className="my-2 bg-[#29382f] rounded-full" >
                    <TabsTrigger value="All" className="rounded-full font-bold transition-all px-4 py-2">All</TabsTrigger>
                    <TabsTrigger value="Active" className="rounded-full font-bold transition-all px-4 py-2">Active</TabsTrigger>
                    <TabsTrigger value="Completed" className="rounded-full font-bold transition-all px-4 py-2">Completed</TabsTrigger>
                </TabsList>
                <TabsContent value="All">
                    {todos.map((task) => (
                        <NoteCards key={task.id} content={task.content} site_content={task.site_content} checked={task.completed} onCheckedChange={(checked) => handleCheckboxChange(task.id, checked)} />
                    ))}
                </TabsContent>
                <TabsContent value="Active">
                    {todos.filter(task => !task.completed).map((task) => (
                        <NoteCards key={task.id} content={task.content} site_content={task.site_content} checked={task.completed} onCheckedChange={(checked) => handleCheckboxChange(task.id, checked)} />
                    ))}
                </TabsContent>
                <TabsContent value="Completed">
                    {todos.filter(task => task.completed).map((task) => (
                        <NoteCards key={task.id} content={task.content} site_content={task.site_content} checked={task.completed} onCheckedChange={(checked) => handleCheckboxChange(task.id, checked)} />
                    ))}
                </TabsContent>
            </Tabs>
        </div>
    );
}
