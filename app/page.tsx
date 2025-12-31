import TodoAppClient from "./dashboard/page";
import { getUserTodos } from "@/lib/todos";

export default async function Home() {
    const todos = await getUserTodos();

    return <TodoAppClient initialTodos={todos}/>;
}
