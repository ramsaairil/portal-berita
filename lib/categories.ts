import { supabase } from "@/lib/supabase";

export async function getPopularCategories() {
  const { data: categories, error } = await supabase
    .from("Category")
    .select(`
      id,
      name,
      slug,
      description,
      createdAt,
      updatedAt,
      Article (
        id,
        Like (count),
        Comment (count)
      )
    `);

  if (error || !categories) {
    console.error("Error fetching popular categories:", error);
    return [];
  }

  const withEngagement = categories.map((cat: any) => {
    // Note: cat.Article is an array of articles
    // Each article has Like and Comment as an array with a { count } object if using count query correctly
    // or just an array if using standard join. In Supabase JS, Like: [{ count: 0 }] or Similar.
    
    const totalEngagement = cat.Article.reduce((acc: number, article: any) => {
      const likesCount = article.Like[0]?.count || 0;
      const commentsCount = article.Comment[0]?.count || 0;
      return acc + likesCount + commentsCount;
    }, 0);
    
    return {
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      createdAt: cat.createdAt,
      updatedAt: cat.updatedAt,
      engagement: totalEngagement
    };
  });

  return withEngagement.sort((a: any, b: any) => b.engagement - a.engagement).slice(0, 7);
}
