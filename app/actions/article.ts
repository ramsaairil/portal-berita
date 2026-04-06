"use server";

import { supabase } from "@/lib/supabase";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";

export async function deleteArticle(articleId: string) {
  const session = await getSession();
  if (!session) return { error: "Silakan login terlebih dahulu." };

  const { data: article, error: findError } = await supabase
    .from("Article")
    .select("authorId")
    .eq("id", articleId)
    .maybeSingle();

  if (findError || !article) {
    return { error: "Artikel tidak ditemukan." };
  }

  const isAuthor = article.authorId === session.user.id;
  const isAdmin = session.user.role === "ADMIN";

  if (!isAuthor && !isAdmin) {
    return { error: "Anda tidak memiliki izin untuk menghapus artikel ini." };
  }

  const { error: deleteError } = await supabase
    .from("Article")
    .delete()
    .eq("id", articleId);

  if (deleteError) {
    console.error("Delete Error:", deleteError);
    return { error: "Gagal menghapus artikel." };
  }

  revalidatePath("/my-articles");
  revalidatePath("/");
  return { success: true };
}
