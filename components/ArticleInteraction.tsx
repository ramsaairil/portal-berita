"use client";

import { useTransition, useState } from "react";
import { toggleLike } from "@/app/actions/interact";
import { useRouter } from "next/navigation";
import { ThumbsUp, MessageSquare, Link as LinkIcon, Bookmark } from "lucide-react";

export default function ArticleInteraction({
  articleId,
  initialLikes,
  initialIsLiked,
  commentCount
}: {
  articleId: string;
  initialLikes: number;
  initialIsLiked: boolean;
  commentCount: number;
}) {
  const [isPending, startTransition] = useTransition();
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const router = useRouter();

  const handleLike = () => {
    // Optimistic Update
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
    setIsLiked(!isLiked);

    startTransition(async () => {
       const res = await toggleLike(articleId);
       if (res?.error) {
          // Revert if failed (e.g., not logged in)
          setLikes(initialLikes);
          setIsLiked(initialIsLiked);
          alert(res.error);
          router.push("/login");
       }
    });
  };

  return (
    <div className="border-y border-gray-100 py-3 flex items-center justify-between mb-10">
      <div className="flex items-center gap-6 text-gray-500">
         <button onClick={handleLike} disabled={isPending} className={`flex items-center gap-2 transition-colors ${isLiked ? 'text-black font-bold' : 'hover:text-black'}`}>
            <ThumbsUp className={`w-5 h-5 ${isLiked ? 'fill-black' : ''}`} /> {likes}
         </button>
         <button onClick={() => {
            const el = document.getElementById("comments");
            el?.scrollIntoView({ behavior: "smooth" });
         }} className="hover:text-black flex items-center gap-2">
            <MessageSquare className="w-5 h-5" /> {commentCount}
         </button>
      </div>
      <div className="flex items-center gap-4 text-gray-500">
         <button className="hover:text-black cursor-not-allowed" title="Segera hadir"><LinkIcon className="w-5 h-5" /></button>
         <button className="hover:text-black cursor-not-allowed" title="Segera hadir"><Bookmark className="w-5 h-5" /></button>
      </div>
    </div>
  );
}
