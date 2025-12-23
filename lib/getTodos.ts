import { Todo } from "@/types/todo";

export async function getTodos(): Promise<Todo[]> {
    // Simulate a database or API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return [
        {
            id: "1",
            content: "Complete project proposal",
            site_content: "Finish the Q1 project proposal and send to stakeholders",
            completed: false,
        },
        {
            id: "2",
            content: "Review pull requests",
            site_content: "Review 5 pending pull requests from the team",
            completed: true,
        },
        {
            id: "3",
            content: "Update documentation",
            site_content: "Update API documentation with new endpoints",
            completed: false,
        },
        {
            id: "4",
            content: "Fix bug in authentication",
            site_content: "Resolve the JWT token expiration issue",
            completed: false,
        },
        {
            id: "5",
            content: "Prepare presentation slides",
            site_content: "Create slides for the team standup meeting",
            completed: true,
        },
        {
            id: "6",
            content: "Database optimization",
            site_content: "Optimize slow queries in the user dashboard",
            completed: false,
        },
        {
            id: "7",
            content: "Write unit tests",
            site_content: "Write tests for the new payment module",
            completed: false,
        },
        {
            id: "8",
            content: "Code review for feature branch",
            site_content: "Review and approve the new feature implementation",
            completed: true,
        },
    ];
}

