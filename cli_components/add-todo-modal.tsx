"use client";

import { useState } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";

export default function AddTodoModal({
  onSubmit, 
  children
}: {
  onSubmit?: (data: { name: string; description: string}) => void,
  children?: React.ReactNode
}) {
    const [open, setOpen] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;

        if (name.trim() === "") return;

        if (onSubmit) {
          onSubmit({ name, description });
        }
        // Reset form and close dialog
        e.currentTarget.reset();
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            {children || <Button className="bg-[#36e27b] rounded-2xl px-7 text-[#112117] font-bold">Add</Button>}
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-[#1c2b24] border border-[#29382f]">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle className="text-white mb-3">New Task</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3 text-white">
                  <Label htmlFor="name-1" className="text-[#9eb7a8]">Task Title</Label>
                  <Input 
                    id="name-1" 
                    name="name" 
                    className="bg-[#112117] border-[#29382f] text-white focus:ring-[#36e27b]"
                  />
                </div>
                <div className="grid gap-3 text-white">
                  <Label htmlFor="description" className="text-[#9eb7a8]">Description</Label>
                  <Textarea 
                    id="description" 
                    name="description" 
                    className="bg-[#112117] border-[#29382f] text-white focus:ring-[#36e27b]"
                  />
                </div>
              </div>
              <DialogFooter className="mt-4">
                <DialogClose asChild>
                  <Button type="button" className="bg-transparent border border-[#29382f] hover:bg-[#29382f] rounded-2xl px-4 text-[#9eb7a8] font-bold">Cancel</Button>
                </DialogClose>
                <Button type="submit" className="bg-[#36e27b] hover:bg-emerald-400 rounded-2xl px-4 text-[#112117] font-bold">Save Task</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
    );
}