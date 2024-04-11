import { Appbar } from "../components/AppBar"
import BlogCard from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks"


const Blogs = () => {

    const {blogs, loading} = useBlogs();
    if(loading){
        return <div>
            <Appbar/>
            <div className="flex justify-center">
                <div className="p-4">
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                </div>
            </div>
        </div>
    }
  return (
    <div>
        <Appbar/>
        
        <div className="flex justify-center">
            <div className="p-4" >
            {blogs.map((blog) => {
            return (
                <BlogCard
                id = {blog.id}
                author={blog.author.name || "Anonymous"}
                title={blog.title}
                content={blog.content}
                publishedDate={new Date().toDateString()}
                />)
        })}
            </div>
        </div>
    </div>
  )
}

export default Blogs