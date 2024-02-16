import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, Legend, Tooltip, ResponsiveContainer, Label } from 'recharts';


export default function Dashboard({ auth, deadlines, tries_user, tries, grades_user, grades }) {
    
    const quantity = (object) =>{
            let n = 0;
            object.forEach((o) =>{
                n++;
            })
            return n;
        }
    
        const data1 = [
        { name: 'Prijavljeni rokovi', value: quantity(tries_user), color: '#EE8232' },
        { name: 'Položeni rokovi', value: quantity(grades_user), color: '#2A5AE5' },
       
      ];
      const data2 = [
        { name: 'Prijavljeni rokovi', value: quantity(tries), color: '#EE8232' },
        { name: 'Položeni rokovi', value: quantity(grades), color: '#2A5AE5' },
       
      ];

    
    return (
        <div>
            <AuthenticatedLayout user={auth.user}>
                <Head title="Dashboard" />

                <div className="bg-gray-200 min-h-screen">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <nav className="bg-white p-4 rounded-lg shadow-md">
                            <ul className="flex space-x-8">
                                <li>
                                <form action="/dashboard"
                                                method="GET">
                                    <button 
                                        className=" hover:text-gray-600 hover:scale-110 text-gray-900 font-semibold" >
                                        Ocijene
                                    </button>
                                    </form>
                                </li>
                                <li>
                                    <button
                                        
                                        className=" hover:text-gray-600 hover:scale-110 text-gray-900 font-semibold"
                                    >
                                        Ispiti
                                    </button>
                                </li>
                            </ul>
                        </nav>

                        
                        
                        <div className="mt-6 container">
                                <div className="bg-white  h-screen shadow-sm sm:rounded-lg grid grid-cols-3">
                                    <div className="ml-20 mt-4 p-6 text-gray-900">
                                        
                                         
                                            {deadlines.map((deadline) => (
                                                <div className="text-center bg-blue-300 w-72 h-28 p-4 rounded-lg shadow-md m-6">
                                                    <form
                                                    action="/addtrie"
                                                    method="GET"
                                                    >
                                                    <input type="hidden" name="course_name" value={deadline.course_name}></input>
                                                    Kolegij: <b>{deadline.course_name}</b>
                                                    <br/>
                                                    
                                                    <input type="hidden" name="deadline_id" value={deadline.id}></input>
                                                    Datum: <b>{deadline.date}</b>

                                                
                                                    <PrimaryButton className="mt-2 ">
                                                        prijavi ispit
                                                    </PrimaryButton>
                                                    </form> 
                                                </div> 
                                            ))}
                                    </div>
                                
                                    <div className="" >  
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart width={400} height={400}>
                                           
                                            <text x="50%" y="50" textAnchor="middle" fontSize="18" fill="#333">
                                                Student
                                            </text>
                                            <Pie
                                                dataKey="value"
                                                isAnimationActive={false}
                                                data={data1}
                                                cx={200}
                                                cy={150}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                label
                                            >
                                                {data1.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>

                                            
                                            <text x="50%" y="300" textAnchor="middle" fontSize="18" fill="#333">
                                               Generacija
                                            </text>
                                            <Pie
                                                dataKey="value"
                                                data={data2}
                                                cx={200}
                                                cy={400}
                                                innerRadius={40}
                                                outerRadius={80}
                                                fill="#82ca9d"
                                                label
                                            >
                                                {data2.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>

                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                    </div>
                                    
                                
                                    <div className="-translate-x-14 mt-4 p-6 text-gray-900">
                                   
                                                {tries_user.map((trie) => (
                                          <div className="text-center bg-orange-300 w-72 h-28 p-4 rounded-lg shadow-md m-6">
                                                
                                                <div>Kolegij:<b>{trie.course_name}</b> </div>
                                                <div>Datum: <b>{trie.deadline_date}</b></div>
                                                <form
                                                    action="/deletetrie"
                                                    method="GET"
                                                    className="mt-2 "
                                                >
                                                    <input
                                                        type="hidden"
                                                        name="id"
                                                        value={trie.id}
                                                    ></input>
                                                    <PrimaryButton className=" ">
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
