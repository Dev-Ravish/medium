import { Circle } from "./BlogCard"

export const BlogSkeleton = () => {
  return (
    <div>
        <div role="status"  className=" animate-pulse border-b border-slate-200 p-4 w-screen max-w-xl cursor-pointer">
            <div className="flex">
                <div>
                    <div className="h-6 w-6 bg-gray-200 rounded-full  mb-4"></div>
                </div>
                <div className="text-sm font-thin pl-2 flex justify-center flex-col">
                    <div className="h-2 bg-gray-200 rounded-full max-w-[300px] mb-2.5"></div>

                </div>
                <div className="pl-2 flex justify-center flex-col">
                    <Circle/>
                </div>
                <div className=" text-sm text-slate-400 pl-2 flex justify-center flex-col font-thin">
                <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>

                </div>
            </div>
            <div className="text-xl font-extrabold mt-2">
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            </div>
            <div className="text-md mt-1 font-normal">
            <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
            </div>
            <div className="text-sm mt-4 font-thin">
            <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
            </div>
        </div>
    </div>
  )
}

