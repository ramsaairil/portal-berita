"use server";

import prisma from "@/lib/prisma";

export async function searchArticles(query: string) {
  if (!query || query.trim().length === 0) return [];
  
  try {
    const articles = await prisma.article.findMany({
      where: {
        title: {
          contains: query,
          mode: "insensitive"
        }
      },
      take: 6,
      select: {
        id: true,
        slug: true,
        title: true,
        featuredImg: true,
      }
    });

    return articles;
  } catch (error) {
    console.error("Search error:", error);
    return [];
  }
}
