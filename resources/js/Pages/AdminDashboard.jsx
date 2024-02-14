import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React, { useState } from "react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Dashboard({ auth, courses}) {
 
    return (
        <div>
            <AuthenticatedLayout user={auth.user}>
                <Head title="AdminDashboard" />

                <div className="bg-gray-200 min-h-screen">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <nav className="bg-white p-4 rounded-lg shadow-md">
                            <ul className="flex space-x-8">
                                <li>
                                    <button
                                       
                                        className="hover:text-gray-600 hover:scale-110 text-gray-900 font-semibold"
                                    >
                                        Kolegiji
                                    </button>
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
                                <form action="/ocijene"
                                                method="GET">
                                    <button 
                                        className=" hover:text-gray-600 hover:scale-110 text-gray-900 font-semibold" >
                                        Dodavanje ocijena
                                    </button></form>
                                </li>
                            </ul>
                        </nav>

                            <div className="mt-6">
                                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                    <div className="flex flex-wrap justify-start p-6 text-gray-900">
                                        <div className="text-center bg-green-200 w-1/4 h-44 p-4 rounded-lg shadow-md m-12">
                                            <b> Dodavanje kolegija</b>

                                            <form
                                                action="/addcourse"
                                                method="GET"
                                            >
                                                <input
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    placeholder="Naziv kolegija"
                                                    className=" rounded-lg shadow-md mt-4 block w-full"
                                                ></input>
                                                <PrimaryButton className="mt-6 ">
                                                    dodaj
                                                </PrimaryButton>
                                            </form>
                                        </div>

                                        {courses.map((course, i) => (
                                            <div className=" text-center bg-gray-200 w-1/4 h-44 p-4 rounded-lg shadow-md m-12">
                                                <div>{i + 1}.Kolegij </div>
                                                <br />
                                                <div className="text-xl text-extrabold">
                                                    {course.name}
                                                </div>
                                                <form
                                                    action="/deletecourse"
                                                    method="GET"
                                                >
                                                    <input
                                                        type="hidden"
                                                        name="id"
                                                        value={course.id}
                                                    ></input>
                                                    <PrimaryButton className="mt-6 ">
                                                        obriši
                                                    </PrimaryButton>
                                                </form>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        
                    </div>
                </div>
            </AuthenticatedLayout>
        </div>
    );
}
