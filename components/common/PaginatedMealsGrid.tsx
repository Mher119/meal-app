'use client';

import { useState, useMemo } from "react";
import Link from "next/link"; 
import Image from "next/image";

type MealBrief = {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
};

type Props = {
    meals: MealBrief[]
}

export default function PaginatedMealsGrid({meals}: Props) {
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const itemsPerPage = 8;
    
    const filtered = useMemo(()=> meals.filter(m=> {
        return m.strMeal.toLowerCase().includes(query.toLowerCase())
    }), 
    [meals, query]);

    
    const totalPages = Math.ceil(filtered.length / itemsPerPage);


    const current = useMemo(()=>{
        const start = (page -1) * itemsPerPage; 
        return filtered.slice(start, start + itemsPerPage);

    }, [filtered, page]);

    const prev = ()=> setPage(p=> Math.max(1, p-1) );
    const next = ()=> setPage(p => Math.min(totalPages, p+1));

    return (
    <div className="MealsListWithSearch">
        <input type="text" placeholder="Search Meal..." value={query} onChange={e=> {
            setQuery(e.target.value);
            setPage(1);
        }} />

            <ul className=" grid grid-cols-4 gap-4">
                {
                    current.map( meal => <li key={meal.idMeal} className=" shadow-md p-4">
                        <Link href={`/meal/${meal.idMeal}`}>
        
                                <Image 
                                    src={meal.strMealThumb}
                                    alt={meal.strMeal}
                                    width={300}
                                    height={200}
                                    priority 
                                    style={{
                                        objectFit: "cover",
                                        width: "100%", 
                                      }}
                                />
                                <div>
                                    <h3 className="text-center">{meal.strMeal}</h3>
                                </div>
                        
                        </Link>      
                    </li>)           
                }
            </ul>

            {/* Pagination */}
            <div className=" flex justify-center items-center gap-4 mt-4">
                <button onClick={prev} disabled={page === 1}>prev</button>
                <span> {page} / {totalPages} </span> 
                <button onClick={next} disabled={page === totalPages}>next</button>
            </div>
            
    </div>
  )
}
