import { Blog } from "../hooks"
import Appbar from "./Appbar"
import { Avatar } from "./BlogCard"

const FullBlog = ({ blog }: { blog: Blog }) => {
    return (
        <div>
            <Appbar />
            <div className="flex justify-center">
                <div className='grid grid-cols-12 w-full pt-12 px-10 max-w-screen-xl'>
                    <div className='col-span-8'>
                        <div className="text-4xl font-extrabold">
                            {blog.title}
                        </div>
                        <div className="text-slate-600 pt-2">
                            Posted on 1 jan 2024
                        </div>
                        <div className="text-xl font-normal pt-4">
                            {blog.content}
                        </div>
                    </div>
                    <div className='col-span-4'>
                        <div className="text-base font-medium">
                            Author
                        </div>
                        <div className="flex items-center mt-2">
                            <Avatar name={blog.author.name || "someone"} />
                            <div className="ml-2">
                                <div className="text-lg font-bold">
                                    {blog.author.name || "someone"}
                                </div>
                                <div className="text-slate-500">
                                    I am the author of this blog okay so Dont complain
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default FullBlog