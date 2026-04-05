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
    <div>
    <div className="min-h-screen pt-24 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Blog Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">CAPO Blog</h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Stay updated with the latest news, reviews, and insights about mobile technology and gadgets.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search blog posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - 2/3 width */}
          <div className="lg:col-span-2">
            {/* Categories Filter */}
            <div className="mb-8 overflow-x-auto">
              <div className="flex space-x-2 pb-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                      selectedCategory === category
                        ? "bg-black dark:bg-white text-white dark:text-black"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {filteredPosts.map((post) => (
                <article 
                  key={post.id} 
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      loading="lazy"
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <FiCalendar />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiUser />
                        {post.author}
                      </span>
                    </div>
                    
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-full">
                        {post.category}
                      </span>
                    </div>
                    
                    <h2 className="text-xl font-bold mb-3 hover:text-gray-600">
                      <Link to={`/blog/${post.id}`}>{post.title}</Link>
                    </h2>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{post.excerpt}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                        >
                          <FiTag size={10} />
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{post.readTime}</span>
                      <Link 
                        to={`/blog/${post.id}`}
                        className="flex items-center text-black hover:text-gray-600 font-medium"
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
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No posts found</h3>
                <p className="text-gray-600 dark:text-gray-300">Try a different search term or category</p>
              </div>
            )}
          </div>

          {/* Sidebar - 1/3 width */}
          <div className="lg:col-span-1">
            {/* Featured Posts */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold mb-6 pb-3 border-b dark:border-gray-700">Featured Posts</h3>
              <div className="space-y-6">
                {featuredPosts.map((post) => (
                  <div key={post.id} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
                      <img
                        loading="lazy"
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 hover:text-gray-600">
                        <Link to={`/blog/${post.id}`}>{post.title}</Link>
                      </h4>
                      <div className="flex items-center text-sm text-gray-500">
                        <FiCalendar className="mr-1" />
                        {post.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold mb-6 pb-3 border-b dark:border-gray-700">Categories</h3>
              <ul className="space-y-3">
                {categories.slice(1).map((category) => (
                  <li key={category}>
                    <button
                      onClick={() => setSelectedCategory(category)}
                      className={`flex items-center justify-between w-full p-2 rounded-lg hover:bg-white dark:hover:bg-gray-700 ${
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
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-6 pb-3 border-b dark:border-gray-700">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="px-3 py-2 bg-white dark:bg-gray-700 border dark:border-gray-600 text-sm rounded-lg hover:bg-black hover:text-white hover:border-black dark:hover:bg-white dark:hover:text-black dark:hover:border-white transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="mt-8 bg-black text-white rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3">Stay Updated</h3>
              <p className="text-gray-300 mb-4">Subscribe to our newsletter for the latest tech insights.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-l-lg text-black dark:text-white dark:bg-gray-800 focus:outline-none"
                />
                <button className="bg-white text-black px-4 py-2 rounded-r-lg font-medium hover:bg-gray-100">
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