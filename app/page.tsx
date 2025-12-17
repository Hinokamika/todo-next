"use client";

import {Progress} from "@/components/ui/progress";
import Check from "@/app/icons/checked";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import NoteCards from "@/app/components/note-cards"
import React from "react";

export default function Home() {
    const [tasks, setTasks] = React.useState([
        { id: "1", content: "Finish the project documentation", site_content: "from work", completed: false },
        { id: "2", content: "Buy groceries for the week", site_content: "from personal", completed: false },
        { id: "3", content: "Schedule dentist appointment", site_content: "from health", completed: false },
    ]);

    const handleCheckboxChange = (id: string, checked: boolean) => {
        setTasks(tasks.map((task) => task.id === id ? { ...task, completed: checked } : task));
    }
    return (
    <div className="min-h-screen px-20 py-5 justtify-start  font-sans bg-green-950">
      <h1 className="text-4xl font-extrabold text-white mb-2"> Focus for Today</h1>
      <div className="max-w-screen flex justify-between text-white">
        <p className="text-gray-500">You have {tasks.filter(task => !task.completed).length} remaining</p>
        <div className="">
          <div className="flex gap-32 mb-2">
            <p className="font-bold">Daily Goal</p>
            <p className="font-bold text-green-600">{tasks.length>0 ?Math.round(tasks.filter(task=> task.completed).length / tasks.length*100):0}%</p>
          </div>
            <Progress value={tasks.length>0 ? Math.round(tasks.filter(task => task.completed).length / tasks.length * 100):0} className="bg-gray-700" indicatorClassName="bg-lime-600"/>
        </div>
      </div>
        <div className="mt-7 flex justify-between border border-gray-700 p-4 rounded-2xl shadow-lg/20 shadow-green-700 mb-4">
            <div className="flex ">
                <Check width={32} height={32} className="text-gray-400 gap-3" />
                <Input className="border-none text-white max-w-full" placeholder="What needs to be done?"/>
            </div>
            <Button className="bg-lime-400 rounded-2xl px-7 text-black font-bold">Add</Button>
        </div>
        <Tabs defaultValue="All">
            <TabsList className="my-2 bg-[#29382f] rounded-full" >
                <TabsTrigger value="All" className="rounded-full font-bold transition-all px-4 py-2">All</TabsTrigger>
                <TabsTrigger value="Active" className="rounded-full font-bold transition-all px-4 py-2">Active</TabsTrigger>
                <TabsTrigger value="Completed" className="rounded-full font-bold transition-all px-4 py-2">Completed</TabsTrigger>
            </TabsList>
            <TabsContent value="All">
                {tasks.map((task) => (
                    <NoteCards key={task.id} content={task.content} site_content={task.site_content} checked={task.completed} onCheckedChange={(checked) => handleCheckboxChange(task.id, checked)} />
                ))}
            </TabsContent>
            <TabsContent value="Active">
                {tasks.filter(task => !task.completed).map((task) => (
                    <NoteCards key={task.id} content={task.content} site_content={task.site_content} checked={task.completed} onCheckedChange={(checked) => handleCheckboxChange(task.id, checked)} />
                ))}
            </TabsContent>
            <TabsContent value="Completed">
                {tasks.filter(task => task.completed).map((task) => (
                    <NoteCards key={task.id} content={task.content} site_content={task.site_content} checked={task.completed} onCheckedChange={(checked) => handleCheckboxChange(task.id, checked)} />
                    ))}
            </TabsContent>
        </Tabs>
    </div>
  );
}
