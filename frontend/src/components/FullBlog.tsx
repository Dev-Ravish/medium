import { Blog } from "../hooks"
import { Appbar } from "./AppBar"
import { Avatar } from "./BlogCard"

export const FullBlog = ({blog}:{blog:Blog}) => {
    console.log(blog)
    return (

        <div>
            <Appbar/>
            <div className="flex justify-center">
                <div className=" grid md:grid-cols-12 gap-10 px-10 w-full pt-[40px] max-w-screen-xl">
                    <div className="md:col-span-8">
                        <div className="font-extrabold text-5xl">
                            {blog.title}
                        </div>

                        <div className="pt-4 text-slate-500 font-semibold text-md">
                            Posted on 2nd Dec, 2023
                        </div>
                        <div className=" pt-5 font-semibold text-lg text-slate-700 ">
                            {blog.content}
                        </div>
                    </div>
                    <div className="md:col-span-4 mb-8 border-t">
                        <div className="font-medium">
                            Author
                        </div>
                        <div className="flex justify-center pt-4">
                            <div className="m-5">
                                <Avatar size="big" name={blog.author.name || "A"}/>
                            </div>
                            <div>
                                <div className="text-2xl font-extrabold">
                                    {blog.author.name || "Anonymous"}
                                </div>
                                <div className="text-slate-700 pt-2">
                                    Master of mirth, purveyor of puns, and the funniest person in the kingdom.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}