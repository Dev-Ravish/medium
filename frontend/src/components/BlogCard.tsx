import { Link } from "react-router-dom"

interface BlogsProps {
    id: string,
    author: string,
    title: string,
    content: string,
    publishedDate: string   // this should be a date

}
const BlogCard = ({id, author, title, content, publishedDate}: BlogsProps) => {
  return (
    <Link to = {`/blog/${id}`}>
    <div className="border-b border-slate-200 p-4 w-screen max-w-xl cursor-pointer">
        <div className="flex">
            <div>
                <Avatar name={author}/>
            </div>
            <div className="text-sm font-thin pl-2 flex justify-center flex-col">
                {author}
            </div>
            <div className="pl-2 flex justify-center flex-col">
                <Circle/>
            </div>
            <div className=" text-sm text-slate-400 pl-2 flex justify-center flex-col font-thin">
                {publishedDate}
            </div>
        </div>
        <div className="text-xl font-extrabold mt-2">
            {title}
        </div>
        <div className="text-md mt-1 font-normal">
            {content.slice(0, 100)+ "..."} 
        </div>
        <div className="text-sm mt-4 font-thin">
            {Math.floor(content.length/100)} min read
        </div>
    </div>
    </Link>
  )
}

export function Circle(){
    return <div className="w-1 h-1 bg-slate-300 rounded-full">

    </div>
}
export function Avatar({name, size="small"}: {name:string, size?:string}){
    return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ${size === "small" ? "w-6 h-6": "w-10 h-10"}`}>
    <span className={`${size === "small" ? "text-sm" : "text-xl"} text-gray-600 dark:text-gray-300 `}>{name[0]}</span>
</div>

}
export default BlogCard;

