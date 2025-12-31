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
  onSubmit?: (data: { content: string; site_content: string}) => void,
  children?: React.ReactNode
}) {
    const [open, setOpen] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const content = formData.get("content") as string;
        const site_content = formData.get("site_content") as string;

        if (content.trim() === "") return;

        if (onSubmit) {
          onSubmit({ content, site_content });
        }
        // Reset form and close dialog
        e.currentTarget.reset();
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            {children || <Button className="bg-[#36e27b] rounded-[5px] px-7 text-[#112117] font-bold">Add</Button>}
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-[#1c2b24] border border-[#29382f] rounded-[20px]">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle className="text-white mb-3">New Task</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3 text-white">
                  <Label htmlFor="content" className="text-[#9eb7a8]">Task Title</Label>
                  <Input 
                    id="content" 
                    name="content" 
                    className="bg-[#112117] border-[#29382f] text-white focus:ring-[#36e27b] rounded-[5px]"
                  />
                </div>
                <div className="grid gap-3 text-white">
                  <Label htmlFor="site_content" className="text-[#9eb7a8]">Description</Label>
                  <Textarea 
                    id="site_content" 
                    name="site_content" 
                    className="bg-[#112117] border-[#29382f] text-white focus:ring-[#36e27b] rounded-[5px]"
                  />
                </div>
              </div>
              <DialogFooter className="mt-4">
                <DialogClose asChild>
                  <Button type="button" className="bg-transparent border border-[#29382f] hover:bg-[#29382f] rounded-[5px] px-4 text-[#9eb7a8] font-bold">Cancel</Button>
                </DialogClose>
                <Button type="submit" className="bg-[#36e27b] hover:bg-emerald-400 rounded-[5px] px-4 text-[#112117] font-bold">Save Task</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
    );
}