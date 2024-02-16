import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import React, { useState, PureComponent} from "react";
import { PieChart, Pie, Cell, Label } from 'recharts';

export default function Dashboard({ auth, courses, grades, grades_user }) {
    
    const prosijek_studenta =() =>{
       let total = 0, n = 0;
        grades_user.forEach((grade) =>{
            total += grade.grade;
            n++;
        })
        return total/n;
    }
    const prosijek_generacije =() =>{
        let total = 0, n = 0;
         grades.forEach((grade) =>{
             total += grade.grade;
             n++;
         })
         return total/n;
     }

    const RADIAN = Math.PI / 180;
    const data1 = [
    { name: 'A', value: prosijek_studenta(), color: '#2A5AE5' },
    { name: 'B', value: (5-prosijek_studenta()), color: '#97A59A' },
    
    ];
    const data2 = [
        { name: 'A', value: prosijek_generacije(), color: '#EE8232' },
        { name: 'B', value: (5-prosijek_generacije()), color: '#97A59A' },
        
    ];
    const cx = 150;
    const cy = 200;
    const iR = 60;
    const oR = 100;
    const value1 = prosijek_studenta();
    const value2 = prosijek_generacije();


const needle = (value, data, cx, cy, iR, oR, color) => {
  let total = 0;
  data.forEach((v) => {
    total += v.value;
  });
  const ang = 180.0 * (1 - value / total);
  const length = (iR + 2 * oR) / 3;
  const sin = Math.sin(-RADIAN * ang);
  const cos = Math.cos(-RADIAN * ang);
  const r = 5;
  const x0 = cx + 5;
  const y0 = cy + 5;
  const xba = x0 + r * sin;
  const yba = y0 - r * cos;
  const xbb = x0 - r * sin;
  const ybb = y0 + r * cos;
  const xp = x0 + length * cos;
  const yp = y0 + length * sin;

  return [
    <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
    <path d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`} stroke="#none" fill={color} />,
  ];
};


    const submit = (course_id) => {
        let odabir = document.getElementById("dodaj");
        odabir.innerHTML = "";
        grades.map((grade) => {
            if (grade.course_id === course_id - "0" && grade.user_id === auth.user.id) {
                let noviElement = document.createElement("div");
                noviElement.classList.add(
                    "relative",
                    "text-center",
                    "bg-gray-200",
                    "w-46",
                    "h-20",
                    "p-4",
                    "rounded-lg",
                    "shadow-md",
                    "m-4"
                );
                // Postavljanje sadržaja
                noviElement.innerHTML = `
                <p>Kolegij:<b> ${grade.course_name}</b></p>
                <p>Ocijena:<b> ${grade.grade}</b></p>
                `;
                // Dodavanje novog elementa kao djeteta odabira
                odabir.appendChild(noviElement);
            }
        });
    };

    return (
        <div>
            <AuthenticatedLayout user={auth.user}>
                <Head title="Dashboard" />

                <div className="bg-gray-200 min-h-screen">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <nav className="bg-white p-4 rounded-lg shadow-md">
                            <ul className="flex space-x-8">
                                <li>
                                    <button
                                        
                                        className="hover:text-gray-600 hover:scale-110 text-gray-900 font-semibold"
                                    >
                                        Ocijene
                                    </button>
                                </li>
                                <li><form action="/ispiti"
                                                method="GET">
                                    <button 
                                        className=" hover:text-gray-600 hover:scale-110 text-gray-900 font-semibold" >
                                        Ispiti
                                    </button>
                                    </form>
                                </li>
                            </ul>
                        </nav>

                        
                     <div className="mt-6">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="  flex flex-wrap justify-start p-6 text-gray-900">
                                 <div className="text-center bg-blue-300 w-1/4 h-28 p-4 rounded-lg shadow-md m-12">
                                            <form>
                                                <label>
                                                    Prikaži ocijene za kolegij:
                                                </label>
                                                <select
                                                    className=" rounded-lg shadow-md block w-full mt-4"
                                                    onChange={(event) =>
                                                        submit(
                                                            event.target.value
                                                        )
                                                    }
                                                >
                                                    <option>-- odaberi --</option>
                                                    {courses.map((course) => (
                                                        <option value={course.id}>
                                                            {course.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </form>
                                </div>
                                <div className=" text-center bg-gray-200 w-94 h-40 p-4 rounded-lg shadow-md  m-12 ml-2">
                                        <div className="flex flex-wrap justify-start ">
                                            <PieChart width={420} height={120}>
                                                <Pie
                    
                                                dataKey="value"
                                                startAngle={180}
                                                endAngle={0}
                                                data={data1}
                                                cx={cx - 50}
                                                cy={cy - 100}
                                                innerRadius={iR}
                                                outerRadius={oR}
                                                fill="#8884d8"
                                                stroke="none"
                                                >
                                                   
                                                 <Label value={prosijek_studenta().toFixed(2)} offset={0} fill="#000000" /> 
                                                  
                                                {data1.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                                
                                                </Pie>
                                                
                                            
                                                {needle(value1, data1, cx - 50, cy - 100, iR, oR, '#d0d000')}
                                                
                                                <Pie
                    
                                                    dataKey="value"
                                                    startAngle={180}
                                                    endAngle={0}
                                                    data={data2}
                                                    cx={cx + 160}
                                                    cy={cy - 100}
                                                    innerRadius={iR}
                                                    outerRadius={oR}
                                                    fill="#8884d8"
                                                    stroke="none"
                                                    >
                                                        <Label value={prosijek_generacije().toFixed(2)} offset={0} fill="#000000" /> 
                                                    {data2.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                                    ))}
                                                </Pie>
                                                {needle(value2, data2, cx + 160, cy - 100, iR, oR, '#d0d000')}
                                                
                                            </PieChart>
                                            
                                            </div>
                                            <div className="flex">
                                            <div className="ml-8">Vaš prosijek ocijena</div>
                                            <div className="ml-20">Prosijek generacije</div>
                                            </div>
                                </div>
                                <div id="dodaj"  className="mt-8"></div>
                                      
                            </div>
                                 
                         </div>
                    </div>
                        
                        
                      
                    </div>
                </div>
            </AuthenticatedLayout>
        </div>
    );
}
