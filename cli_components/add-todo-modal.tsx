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

export default function AddTodoModal({onSubmit}: {onSubmit?: (data: { name: string; description: string}) => void}) {
    const [open, setOpen] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        if (onSubmit) {
          onSubmit({ name, description });
        }
        // Reset form and close dialog
        e.currentTarget.reset();
        setOpen(false);
    };

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-lime-400 rounded-2xl px-7 text-black font-bold">Add</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-[#112117] border-none">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle className="text-white mb-3">New Task</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3 text-white">
                  <Label htmlFor="name-1" >Task Title</Label>
                  <Input id="name-1" name="name" />
                </div>
                <div className="grid gap-3 text-white">
                  <Label htmlFor="username-1">Description</Label>
                  <Textarea name="description" />
                </div>
              </div>
              <DialogFooter className="mt-4">
                <DialogClose asChild>
                  <Button type="button" className="bg-transparent border rounded-2xl px-4 text-white font-bold">Cancel</Button>
                </DialogClose>
                <Button type="submit" className="bg-lime-400 rounded-2xl px-4 text-black font-bold">Save changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
            </Dialog>
        </div>
    );
}