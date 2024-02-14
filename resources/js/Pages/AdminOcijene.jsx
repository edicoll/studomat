import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React, { useState } from "react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Dashboard({ auth, courses, grades, users }) {
   

    const submit = (user_id) => {
        let odabir = document.getElementById("dodaj");
        odabir.innerHTML = "";
        grades.map((grade) => {
            if (grade.user_id === user_id - "0") {
                let noviElement = document.createElement("div");
                noviElement.classList.add(
                    "relative",
                    "text-center",
                    "bg-gray-200",
                    "w-80",
                    "h-30",
                    "p-4",
                    "rounded-lg",
                    "shadow-md",
                    "mt-12",
                    "m-8"
                );
                // Postavljanje sadržaja
                noviElement.innerHTML = `
                    <p>Student:<b> ${grade.user_name}</b></p>
                    <p>Kolegij:<b> ${grade.course_name}</b></p>
                    <p>Ocijena:<b> ${grade.grade}</b></p>
                    <form
                    action="/deletegrade"
                    method="GET"
                >
                    <input
                        type="hidden"
                        name="id"
                        value=${grade.id}
                    ></input>
                    <button style="background-color: rgb(18, 24, 46) ; color: white; border: none; border-radius: 10px; height: 30px;font-size: 12px;padding: 5px 20px;">OBRIŠI</button>
                </form>
                `;
                // Dodavanje novog elementa kao djeteta odabira
                odabir.appendChild(noviElement);
            }
        });
    };

    return (
        <div>
            <AuthenticatedLayout user={auth.user}>
                <Head title="AdminDashboard" />

                <div className="bg-gray-200 min-h-screen">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <nav className="bg-white p-4 rounded-lg shadow-md">
                            <ul className="flex space-x-8">
                                <li>
                                <form action="/home"
                                                method="GET">
                                    <button 
                                        className=" hover:text-gray-600 hover:scale-110 text-gray-900 font-semibold" >
                                        Kolegiji
                                    </button>
                                    </form>
                                </li>
                                <li>
                                <form action="/rokovi"
                                                method="GET">
                                    <button 
                                        className=" hover:text-gray-600 hover:scale-110 text-gray-900 font-semibold" >
                                        Dodavanje rokova
                                    </button></form>
                                </li>
                                <li>
                                    <button
                                     
                                        className=" hover:text-gray-600 hover:scale-110 text-gray-900 font-semibold"
                                    >
                                        Unos ocijena
                                    </button>
                                </li>
                            </ul>
                        </nav>

                            <div className="mt-6">
                                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                    <div className="flex flex-wrap justify-start p-6 text-gray-900">
                                        <div className="text-center bg-green-200 w-1/4  p-4 rounded-lg shadow-md m-12">
                                            <b>Dodavanje ocijena</b>
                                            <form
                                                action="/addgrade"
                                                method="GET"
                                                className="mt-4"
                                            >
                                                <label>Odaberi kolegij</label>
                                                <select
                                                    name="course_id"
                                                    className=" rounded-lg shadow-md  block w-full"
                                                ><option></option>
                                                    {courses.map((course) => (
                                                        <option
                                                            value={course.id}
                                                        >
                                                            {course.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                <br />
                                                <label>Odaberi studenta</label>
                                                <select
                                                    name="user_id"
                                                    className=" rounded-lg shadow-md block w-full"
                                                ><option></option>
                                                    {users.map((user) => (
                                                        <option value={user.id}>
                                                            {user.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                <div className="mt-6">
                                                    <label>
                                                        Odaberi ocijenu
                                                    </label>
                                                    <select
                                                        name="grade"
                                                        className=" rounded-lg shadow-md block w-full"
                                                    ><option></option>
                                                        <option value="1">
                                                            1
                                                        </option>
                                                        <option value="2">
                                                            2
                                                        </option>
                                                        <option value="3">
                                                            3
                                                        </option>
                                                        <option value="4">
                                                            4
                                                        </option>
                                                        <option value="5">
                                                            5
                                                        </option>
                                                    </select>
                                                </div>
                                                <PrimaryButton className="mt-6 ">
                                                    dodaj
                                                </PrimaryButton>
                                            </form>
                                        </div>
                                        <div className="text-center bg-blue-300 w-1/4 h-24 p-4 rounded-lg shadow-md m-12">
                                            <form>
                                                <label>
                                                    Prikaži ocijene za studenta:
                                                </label>
                                                <select
                                                    className=" rounded-lg shadow-md block w-full"
                                                    onChange={(event) =>
                                                        submit(
                                                            event.target.value
                                                        )
                                                    }
                                                >
                                                    <option></option>
                                                    {users.map((user) => (
                                                        <option value={user.id}>
                                                            {user.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </form>
                                        </div>
                                        <div id="dodaj"></div>
                                    </div>
                                </div>
                            </div>
                       
                    </div>
                </div>
            </AuthenticatedLayout>
        </div>
    );
}
