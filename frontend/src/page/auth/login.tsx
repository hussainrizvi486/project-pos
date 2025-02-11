import React from "react";

const Page: React.FC = () => {
    return (
        <div>
            <div className="mx-auto max-w-lg ">
                <div className="shadow rounded-xl">
                    <div className="mb-4">
                        <div className="text-lg font-semibold text-center">Login</div>
                        <div className="text-sm">
                            Enter your email and password to login
                        </div>
                    </div>

                    <div>
                        <div>
                            <div>Email</div>
                            <input type="text" className="flex h-9 w-full border bg-transparent px-3 py-1 text-base shadow-sm transition-colors" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Page;
// class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"