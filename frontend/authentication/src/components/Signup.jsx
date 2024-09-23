import React, { useState } from 'react'
function Signup() {
    const [signUpUser, setSignUpUser] = useState({
        fullname: "",
        email: "",
        password: ""
    })

    const inputOnChange = (event) => {
        const { name, value } = event.target

        setSignUpUser({
            ...signUpUser,
            [name]: value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const { fullname, email, password } = signUpUser
        console.log(fullname, email, password);

        if (!fullname || !email || !password) {
            throw new Error("All fields are required")
        }
        try {
            const response = await fetch("http://localhost:3000/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(signUpUser)
            })
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Registration failed");
            }
            const data = await response.json();
            console.log("User registered successfully:", data);
        } catch (error) {
            console.log("Error occured", error)
        }
    }
    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label
                                htmlFor="fullname"
                                className="block text-sm font-medium leading-6 text-gray-900">
                                Full Name</label>

                            <div className="mt-2">
                                <input
                                    onChange={inputOnChange}
                                    id="fullname"
                                    name="fullname"
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900">Email address</label>

                            <div className="mt-2">
                                <input
                                    onChange={inputOnChange}
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 text-gray-900">
                                    Password</label>
                                <div className="text-sm">

                                </div>
                            </div>
                            <div className="mt-2">

                                <input
                                    id="password"
                                    onChange={inputOnChange}
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>



                        <div>
                            <button
                                onClick={handleSubmit}
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?
                        <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Start a 14 day free trial</a>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Signup;