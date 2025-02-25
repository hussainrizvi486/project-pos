import React from "react";
import { useLoginMutation } from "@features/auth/api";
import { useDispatch } from "react-redux";

const Page: React.FC = () => {
    const dispatch = useDispatch();
    const loginMutation = useLoginMutation(dispatch);


    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const data: { [key: string]: any } = {};

        formData.forEach((value, key) => {
            data[key] = value;
        });
        loginMutation.mutate(data, dispatch);

    }


    return (
        <div>
            <div className="mx-auto max-w-md mt-20 ">
                <form className="shadow rounded-xl p-5" onSubmit={handleLogin}>
                    <div className="mb-5">
                        <div className="text-center">
                            <div className="text-lg font-semibold ">Login</div>
                            <div className="text-sm mt-2">
                                Enter your email and password to login
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="mb-5">
                            <div className="text-sm font-medium mb-1 text-gray-600">Email</div>
                            <input type="email" className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1"
                                placeholder="user@example.com"
                                name="email"
                            />
                        </div>

                        <div>
                            <div className="text-sm font-medium mb-1  text-gray-600">Password</div>
                            <input type="password" className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1"
                                placeholder="***********"
                                name="password"
                            />
                        </div>

                        <div className="mt-6">
                            <button className="rounded-md bg-gray-900 px-3 py-2 text-sm  text-white w-full" type="submit">
                                Login
                            </button>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Page;