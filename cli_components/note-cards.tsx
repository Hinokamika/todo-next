import {Checkbox} from "@/components/ui/checkbox";
import {cn} from "@/lib/utils";

export default function NoteCards({className, id, content, site_content, checked, onCheckedChange}: {className?: string; id?: string; content: string, site_content:string, checked?: boolean, onCheckedChange?: (checked: boolean) => void}) {
  return (
      <div className="py-2">
        <div className={cn("border border-transparent bg-green-900 rounded-lg flex items-center p-4 px-6", { "bg-gray-800": checked })}>
          <Checkbox id={id} checked={checked} onCheckedChange={onCheckedChange} className="rounded-md"/>
          <div className={cn("ml-4", className)}>
            <p className={cn("text-white text-xl font-bold", { "line-through text-gray-400": checked })}>{content}</p>
            <p className={cn("text-green-500 text-sm", { "text-gray-400": checked })}>{site_content}</p>
          </div>
        </div>
      </div>
  )
}
