import TodoAppClient from "./dashboard/page";
import { getTodos } from "@/lib/getTodos";

export default async function Home() {
    const initialTodos = await getTodos();

    return <TodoAppClient initialTodos={initialTodos} />;
}
