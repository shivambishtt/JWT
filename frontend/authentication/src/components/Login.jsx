import React, { useState } from 'react'


// let's breakdown the code for the login functionality

// sabse pehle to ek state maintain kar lenge user ke data ke liye taaki user apna data daal sake
// uske baad in values ko hum bind kardenge
// bind karne ke baad hum sabse pehle to ek post request marenge
// ab humne isko handlesubmit ke andar to daaldia hai ab basically hum kya karenge
// ab request to karli hai uske baad kya karee uske baad ek handler function likho jo handlerfunction kya karega simply wo jo bhi humari login info ki prop hai uski value set karega

function Login() {
    const [errMessage, setErrMessage] = useState()
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: ""
    })

    // hume input onchange karna hai matlab ki
    // hume ye specify karna hai ki jab input ki value me change hoga tab hume logininfo ke nadar ki value yaani ki email ki value ko event.target.value se set karna hai
    const inputOnChange = (event) => {
        const { name, value } = event.target

        setLoginInfo({
            ...loginInfo,
            [name]: value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const { email, password } = loginInfo
        if (!email || !password) {
            setErrMessage("All fields are required")
        }
        try {
            const response = await fetch("http://localhost:3000/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginInfo)
            })

            if (!response.ok) {
                const errorData = await response.json()
                console.log("Error data", errorData);

                if (errorData.message === "Invalid credentials") {
                    alert("The password you entered is incorrect .Please try again")
                }
                else if (errorData.message === "User does not exist please register first") {
                    alert("Try registering the user first")
                } else {
                    alert("Login failed")
                }
                return

            }

            const result = await response.json()
            console.log("User successfully logged in", result);

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Log in to your account</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label
                                for="email"
                                className="block text-sm font-medium leading-6 text-gray-900">
                                Email address</label>

                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    onChange={inputOnChange}
                                    type="email"
                                    value={loginInfo.email}
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>

                            <div className="flex items-center justify-between">
                                <label for="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    onChange={inputOnChange}
                                    name="password"
                                    type="password"
                                    value={loginInfo.password}
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Log in</button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?
                        <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Start a 14 day free trial</a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login
