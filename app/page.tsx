import TodoAppClient from "./components/todo-app/todo-app-client";
import { getTodos } from "@/lib/getTodos";

export default async function Home() {
    const initialTodos = await getTodos();

    return <TodoAppClient initialTodos={initialTodos} />;
}
