import { useState } from "react";
import { Link } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { FiCalendar, FiUser, FiTag, FiArrowRight, FiSearch, FiChevronRight } from "react-icons/fi";
import Footer from "../components/Footer";

type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  featured: boolean;
};

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Future of Mobile Technology in 2024",
    excerpt: "Discover the latest trends and innovations shaping the mobile technology landscape this year.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Alex Johnson",
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Technology",
    tags: ["Mobile", "Innovation", "Tech Trends"],
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=400&fit=crop",
    featured: true
  },
  {
    id: 2,
    title: "How to Extend Your Smartphone Battery Life",
    excerpt: "Practical tips and tricks to maximize your smartphone battery performance and longevity.",
    content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    author: "Sarah Miller",
    date: "2024-01-12",
    readTime: "4 min read",
    category: "Tips & Tricks",
    tags: ["Battery", "Smartphones", "Maintenance"],
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=400&fit=crop",
    featured: true
  },
  {
    id: 3,
    title: "Top 10 Wireless Earbuds for 2024",
    excerpt: "Our comprehensive review of the best wireless earbuds available in the market right now.",
    content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    author: "Michael Chen",
    date: "2024-01-10",
    readTime: "6 min read",
    category: "Reviews",
    tags: ["Earbuds", "Audio", "Review"],
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&h=400&fit=crop",
    featured: false
  },
  {
    id: 4,
    title: "Understanding Different Types of SSDs",
    excerpt: "A beginner's guide to SSD technology and how to choose the right one for your needs.",
    content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    author: "David Wilson",
    date: "2024-01-08",
    readTime: "7 min read",
    category: "Guides",
    tags: ["SSD", "Storage", "Hardware"],
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&h=400&fit=crop",
    featured: false
  },
  {
    id: 5,
    title: "The Rise of Foldable Phones: Are They Worth It?",
    excerpt: "Analyzing the pros and cons of foldable smartphones in today's market.",
    content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    author: "Emma Davis",
    date: "2024-01-05",
    readTime: "8 min read",
    category: "Technology",
    tags: ["Foldable", "Smartphones", "Innovation"],
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=400&fit=crop",
    featured: false
  },
  {
    id: 6,
    title: "Power Bank Buying Guide: What to Look For",
    excerpt: "Essential factors to consider when purchasing a power bank for your devices.",
    content: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
    author: "Robert Brown",
    date: "2024-01-03",
    readTime: "5 min read",
    category: "Guides",
    tags: ["Power Banks", "Charging", "Accessories"],
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&h=400&fit=crop",
    featured: false
  },
  {
    id: 7,
    title: "Apple vs Android: Which Ecosystem Is Right For You?",
    excerpt: "Comparing the Apple and Android ecosystems to help you make an informed decision.",
    content: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur.",
    author: "Lisa Taylor",
    date: "2024-01-01",
    readTime: "9 min read",
    category: "Comparison",
    tags: ["Apple", "Android", "Ecosystem"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop",
    featured: true
  },
  {
    id: 8,
    title: "Essential Phone Accessories for Travelers",
    excerpt: "Must-have phone accessories for people who are always on the go.",
    content: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis.",
    author: "James Wilson",
    date: "2023-12-28",
    readTime: "4 min read",
    category: "Lifestyle",
    tags: ["Accessories", "Travel", "Gadgets"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop",
    featured: false
  }
];

const categories = [
  "All",
  "Technology",
  "Reviews",
  "Guides",
  "Tips & Tricks",
  "Comparison",
  "Lifestyle"
];

const popularTags = [
  "Mobile", "Smartphones", "Apple", "Android", "Accessories",
  "Battery", "Charging", "Audio", "Innovation", "Tech Trends"
];

const Blog = () => {
  useDocumentTitle("Blog");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <div className="overflow-x-clip">
      <div className="min-h-screen px-4 pb-12 pt-24 sm:px-5 md:px-6">
        <div className="mx-auto max-w-7xl">
        {/* Blog Header */}
        <div className="mb-10 text-center sm:mb-12">
          <h1 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">TipToe Blog</h1>
          <p className="mx-auto max-w-2xl text-base text-gray-600 dark:text-gray-300 sm:text-lg">
            Stay updated with the latest news, reviews, and insights about mobile technology and gadgets.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mx-auto mb-8 max-w-2xl">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search blog posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:text-base"
            />
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3 xl:gap-10">
          {/* Main Content - 2/3 width */}
          <div className="lg:col-span-2">
            {/* Categories Filter */}
            <div className="relative mb-8">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-white via-white/90 to-transparent dark:from-gray-900 dark:via-gray-900/90 sm:hidden" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-gradient-to-l from-white via-white/90 to-transparent dark:from-gray-900 dark:via-gray-900/90 sm:hidden" />
              <div className="blog-chip-scrollbar -mx-4 flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 pb-3 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:rounded-none sm:bg-transparent sm:px-0 sm:pb-0">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`shrink-0 snap-start rounded-full border px-4 py-1.5 text-sm font-medium leading-5 transition-all duration-200 sm:shrink ${
                      selectedCategory === category
                        ? "border-black bg-black text-white shadow-[0_10px_24px_rgba(15,23,42,0.16)] dark:border-white dark:bg-white dark:text-black"
                        : "border-gray-200 bg-gray-100 text-gray-700 hover:border-gray-300 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
              {filteredPosts.map((post) => (
                <article 
                  key={post.id} 
                  className="overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-lg dark:bg-gray-800"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      loading="lazy"
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5 sm:p-6">
                    <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500 sm:text-sm">
                      <span className="flex min-w-0 items-center gap-1">
                        <FiCalendar />
                        {post.date}
                      </span>
                      <span className="flex min-w-0 items-center gap-1">
                        <FiUser />
                        <span className="truncate">{post.author}</span>
                      </span>
                    </div>
                    
                    <div className="mb-3">
                      <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                        {post.category}
                      </span>
                    </div>
                    
                    <h2 className="mb-3 text-xl font-bold leading-tight hover:text-gray-600">
                      <Link to={`/blog/${post.id}`}>{post.title}</Link>
                    </h2>
                    
                    <p className="mb-4 text-sm leading-6 text-gray-600 dark:text-gray-300 sm:text-base">{post.excerpt}</p>
                    
                    <div className="mb-4 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                        >
                          <FiTag size={10} />
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <span className="text-sm text-gray-500">{post.readTime}</span>
                      <Link 
                        to={`/blog/${post.id}`}
                        className="inline-flex items-center font-medium text-black hover:text-gray-600 dark:text-white dark:hover:text-gray-300"
                      >
                        Read More
                        <FiArrowRight className="ml-2" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* No Results Message */}
            {filteredPosts.length === 0 && (
              <div className="py-12 text-center">
                <h3 className="mb-2 text-xl font-semibold">No posts found</h3>
                <p className="text-gray-600 dark:text-gray-300">Try a different search term or category</p>
              </div>
            )}
          </div>

          {/* Sidebar - 1/3 width */}
          <div className="space-y-6 lg:col-span-1 lg:space-y-8">
            {/* Featured Posts */}
            <div className="rounded-xl bg-gray-50 p-5 dark:bg-gray-800 sm:p-6">
              <h3 className="mb-5 border-b pb-3 text-xl font-bold dark:border-gray-700">Featured Posts</h3>
              <div className="space-y-5">
                {featuredPosts.map((post) => (
                  <div key={post.id} className="flex items-start gap-3 sm:gap-4">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg sm:h-20 sm:w-20">
                      <img
                        loading="lazy"
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="mb-1 text-sm font-semibold leading-6 hover:text-gray-600 sm:text-base">
                        <Link to={`/blog/${post.id}`}>{post.title}</Link>
                      </h4>
                      <div className="flex flex-wrap items-center text-xs text-gray-500 sm:text-sm">
                        <FiCalendar className="mr-1" />
                        {post.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="rounded-xl bg-gray-50 p-5 dark:bg-gray-800 sm:p-6">
              <h3 className="mb-5 border-b pb-3 text-xl font-bold dark:border-gray-700">Categories</h3>
              <ul className="space-y-3">
                {categories.slice(1).map((category) => (
                  <li key={category}>
                    <button
                      onClick={() => setSelectedCategory(category)}
                      className={`flex w-full items-center justify-between rounded-lg p-2 text-left transition-colors hover:bg-white dark:hover:bg-gray-700 ${
                        selectedCategory === category ? "bg-white dark:bg-gray-700 font-medium" : ""
                      }`}
                    >
                      <span>{category}</span>
                      <FiChevronRight />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular Tags */}
            <div className="rounded-xl bg-gray-50 p-5 dark:bg-gray-800 sm:p-6">
              <h3 className="mb-5 border-b pb-3 text-xl font-bold dark:border-gray-700">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="rounded-lg border bg-white px-3 py-2 text-sm transition-colors hover:border-black hover:bg-black hover:text-white dark:border-gray-600 dark:bg-gray-700 dark:hover:border-white dark:hover:bg-white dark:hover:text-black"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="rounded-xl bg-black p-5 text-white sm:p-6">
              <h3 className="mb-3 text-xl font-bold">Stay Updated</h3>
              <p className="mb-4 text-sm text-gray-300 sm:text-base">Subscribe to our newsletter for the latest tech insights.</p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder="Your email"
                  className="min-w-0 flex-1 rounded-lg px-4 py-3 text-black focus:outline-none dark:bg-gray-800 dark:text-white sm:rounded-r-none"
                />
                <button className="rounded-lg bg-white px-4 py-3 font-medium text-black hover:bg-gray-100 sm:rounded-l-none">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      </div>
      <Footer />
    </div>
  );
};

export default Blog;
