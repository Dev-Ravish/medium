export const FullBlogSkeleton  = () => {
    return (
        <div>
            <div role="status" className="animate-pulse flex justify-center">
                <div className=" grid md:grid-cols-12 gap-10 px-10 w-full pt-[40px] max-w-screen-xl">
                    <div className="md:col-span-8">
                        <div className="font-extrabold text-5xl">
                            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>

                        </div>

                        <div className="pt-4 text-slate-500 font-semibold text-md">
                            <div className="h-2 bg-gray-200 rounded-full max-w-[330px] mb-2.5"></div>

                        </div>
                        <div className=" pt-5 font-semibold text-lg text-slate-700 ">
                            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>

                        </div>
                    </div>
                    <div className="md:col-span-4 mb-8 border-t">
                        <div className="font-medium">
                            Author
                        </div>
                        <div className="flex justify-center pt-4">
                            <div className="m-5">
                                <div className="h-10 w-10 bg-gray-200 rounded-full  mb-4"></div>

                            </div>
                            <div>
                                <div className="text-2xl font-extrabold pb-8 ">
                                    <div className="h-2 bg-gray-200 rounded-full max-w-[330px] mb-2.5"></div>

                                </div>
                                <div className="text-slate-700 pt-2">
                                    <div className="h-2 bg-gray-200 rounded-full max-w-[330px] mb-2.5"></div>                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>)
}