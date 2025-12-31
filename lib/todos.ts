"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function getUserTodos() {
  const session = await getServerSession(authOptions);

  // Not logged in → no data
  if (!session?.user?.email) {
    return [];
  }

  return prisma.todo.findMany({
    where: {
      user: {
        email: session.user.email,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function addTodo(
  content: string,
  site_content: string,
  completed: boolean
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  return prisma.todo.create({
    data: {
      content,
      site_content,
      completed,
      user: {
        connect: {
          email: session.user.email,
        },
      },
    },
  });
}

export async function deleteTodo(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  return prisma.todo.delete({
    where: {
      id,
    },
  });
}

export async function updateTodo(
  id: string,
  content: string,
  site_content: string,
  completed: boolean
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  return prisma.todo.update({
    where: {
      id,
    },
    data: {
      content,
      site_content,
      completed,
    },
  });
}
