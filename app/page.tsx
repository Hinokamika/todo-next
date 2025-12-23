import TodoAppClient from "./components/todo-app/todo-app-client";
import { getTodos } from "@/lib/getTodos";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Focus for Today | Todo App",
    description: "Stay productive and organize your daily tasks with Focus for Today. Track your progress and achieve your goals.",
    keywords: ["todo", "productivity", "tasks", "goals", "daily planner"],
    authors: [{ name: "Todo App" }],
    creator: "Todo App Team",
    openGraph: {
        title: "Focus for Today - Todo App",
        description: "Stay productive and organize your daily tasks",
        url: "https://todo-app.com",
        siteName: "Focus for Today",
        type: "website",
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: "Focus for Today - Todo App",
        description: "Stay productive and organize your daily tasks",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default async function Home() {
    const initialTodos = await getTodos();

    return <TodoAppClient initialTodos={initialTodos} />;
}
