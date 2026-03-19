import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowRight, User, Calendar } from "lucide-react";
import { format } from "date-fns";

async function getPosts() {
  return prisma.blogPost.findMany({ where: { published: true }, orderBy: { createdAt: "desc" } });
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen pt-24 bg-brand-dark">
      <div className="container py-12">
        <div className="text-center mb-16">
          <h1 className="font-bebas text-6xl md:text-8xl text-white">THE FASTLANE <span className="text-brand-red">JOURNAL</span></h1>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">Insights, reviews, and guides from the world of luxury automobiles.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group">
              <div className="card h-full flex flex-col">
                <div className="relative h-60 overflow-hidden">
                  <img 
                    src={post.coverImage || "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800"} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-brand-red text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
                    <span className="flex items-center gap-1"><Calendar size={12} /> {format(new Date(post.createdAt), "MMM d, yyyy")}</span>
                  </div>
                  
                  <h2 className="text-xl font-bold text-white mb-3 group-hover:text-brand-red transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-400 text-sm mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-brand-border flex items-center justify-between text-brand-red text-sm font-bold">
                    <span>READ MORE</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
