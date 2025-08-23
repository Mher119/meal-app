'use client';
import { useState } from "react";
import Link from "next/link";
import { Pagination } from "antd";
import Image from "next/image";


type Category = {
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
}

interface Props{
    categories: Category[];
}


export function CategoryList({categories}: Props) {

    const [current, setCurrent] = useState(1);
    const pageSize = 8;

    const from = (current-1) * pageSize;
    const to = from + pageSize;
    const pageData = categories.slice(from, to);
    

  return (
    <>
        <ul className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {
                pageData.map(item => <li  key={item.idCategory} className=" shadow-lg p-4 bg-green-100">

                    <Image className=" w-full" src={item.strCategoryThumb} alt={item.strCategory} width={300} height={300}/>

                    <div>
                        <h2 className=" italic font-bold text-2xl text-green-900">{item.strCategory}</h2>
                        <p className=" text-green-700">{item.strCategoryDescription.slice(0, 250)}</p>
                        <Link href={`/category/${item.strCategory}`} className="">View meals ...</Link>
                    </div>
                    
                </li>)
            }
        </ul>

        <div className=" flex justify-center">
            <Pagination 
                defaultCurrent={1}
                total={categories.length}
                pageSize={pageSize}
                onChange={page => setCurrent(page)}
            />
        </div>
    </>
  )
}
