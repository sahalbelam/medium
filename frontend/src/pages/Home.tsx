import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, Menu } from "lucide-react"
import { useBlogs } from "../hooks"
import image from '../images/image.jpg'

export default function HomePage() {
    const { blogs } = useBlogs();
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 mr-2" />
              <span className="text-2xl font-bold">Large</span>
            </div>
            <nav className="hidden md:flex space-x-4">
              <Link to="#" className="text-sm font-medium hover:text-primary">
                Home
              </Link>
              <Link to="/signup" className="text-sm font-medium hover:text-primary">
                Write
              </Link>
              <Link to="/signup" className="text-sm font-medium hover:text-primary">
                Sign up
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link to={'/signup'}><Button>Get Started</Button></Link>
            </div>
            <button className="md:hidden">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Where good ideas find you
              </h1>
              <p className="mt-6 text-xl text-gray-500">
                Read and share new perspectives on just about any topic. Everyone's welcome.
              </p>
              <div className="mt-10">
              <Link to={'/blog'}><Button>Start Reading</Button></Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8">Featured Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 hover:cursor-pointer">
              {blogs.slice(0,3).map((blog) => (
                <Link to={`/blog/${blog.id}`}>
                <article key={blog.id} className="border rounded-lg overflow-hidden shadow-sm">
                  <img
                    src={image}
                    alt="Article thumbnail"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">       
                        <h3 className="text-xl font-semibold mb-2">
                        {blog.title}
                        </h3>
                        <p className="text-gray-600 mb-4">
                        {blog.content.slice(0,100)+"..."}
                        </p>
                        <div className="flex items-center">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={`./placeholder.svg?height=40&width=40`} />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                            <p className="text-sm font-medium">{blog.author.name}</p>
                            <p className="text-sm text-gray-500">May 15, 2023 · 1 min read</p>
                        </div>
                    </div>
                  </div>
                </article></Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Never miss a story</h2>
              <p className="text-xl text-gray-500 mb-8">
                Get the best content delivered directly to your inbox.
              </p>
              <form className="flex max-w-md mx-auto">
                <Input type="email" placeholder="Enter your email" className="rounded-r-none" />
                <Button type="submit" className="rounded-l-none">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-8 p-4 border-t border-gray-800 text-center bg-slate-900 text-white">
        <p>&copy; 2024 Large. All rights reserved.</p>
        <p>Created by Sahal Belam</p>
      </footer>
    </div>
  )
}