import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { FullBlog } from "../components/FullBlog";
import { FullBlogSkeleton } from "../components/FullBlogSkeleton";
import { Appbar } from "../components/AppBar";


const Blog = () => {
  const {id} = useParams();
  const {loading, blog} = useBlog({id: id || ""});
  if(loading){
      return <div>
        <Appbar/>
        <FullBlogSkeleton/>
      </div>
  }
  return (
    <div>
      {blog && <FullBlog blog={blog}/>}
    </div>
  )
}

export default Blog