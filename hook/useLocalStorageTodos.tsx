import { useEffect, useState } from "react";
import { Todo } from "@/types/todo";

const STORAGE_KEY = "todos";

const getInitialTodos = (): Todo[] => {
    if (typeof window === "undefined") {
        return [];
    }
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (error) {
        console.error("Failed to load todos from localStorage", error);
    }
    return [];
};

export function useLocalStorageTodos() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Initialize from localStorage on client-side only
    useEffect(() => {
        const initialTodos = getInitialTodos();
        setTodos(initialTodos);
        setIsInitialized(true);
    }, []);

    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === STORAGE_KEY) {
                setTodos(getInitialTodos());
            }
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    // Only save to localStorage after initial hydration
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
        }
    }, [todos, isInitialized]);

    return [todos, setTodos] as const;
}
