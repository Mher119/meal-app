import { MealApiResponse } from "@/ui/content/types";
import Image from "next/image";

interface MealPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MealPage({ params }: MealPageProps) {
  // 👇 Next.js 15+ -ում params-ը Promise ա, դրա համար await ենք անում
  const { id } = await params;

  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(id)}`,
    { next: { revalidate: 60 } } // optional caching
  );

  const data: MealApiResponse = await res.json();

  if (!data.meals || data.meals.length === 0) {
    return <p>No meal found with ID {id}</p>;
  }

  const meal = data.meals[0];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{meal.strMeal}</h1>
      <Image
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="rounded-lg shadow-md mb-6 "
        width={300}
        height={300}
      />
      <h2 className="text-xl font-semibold mb-2">Instructions</h2>
      <p className="mb-4 whitespace-pre-line">{meal.strMeal}</p>

      <h2 className="text-xl font-semibold mb-2">Category</h2>
      <p className="mb-4">{meal.strCategory}</p>

      <h2 className="text-xl font-semibold mb-2">Area</h2>
      <p className="mb-4">{meal.strArea}</p>
    </div>
  );
}
