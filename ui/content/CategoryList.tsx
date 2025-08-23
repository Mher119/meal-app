import Image from "next/image";
import Link from "next/link";
import { Category } from "./types";

type Props = {
  categories: Category[];
};

export function CategoryList({ categories }: Props) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {categories.map(cat => (
        <div key={cat.idCategory} className="shadow p-4 bg-green-100">
          <Image
            src={cat.strCategoryThumb || "/noimg.png"}
            alt={cat.strCategory}
            width={300}
            height={200}
            className="w-full object-cover"
          />
          <h2 className="italic font-bold text-2xl text-green-900">{cat.strCategory}</h2>
          <p className="text-green-700">{cat.strCategoryDescription.slice(0, 250)}</p>
          <Link href={`/category/${cat.strCategory}`} className="text-blue-600 underline mt-2 block">
            View meals...
          </Link>
        </div>
      ))}
    </div>
  );
}
