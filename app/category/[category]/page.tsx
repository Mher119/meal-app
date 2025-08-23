import { FilterResponse } from "@/ui/content/types";
import MealList from "@/ui/content/MealList";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params; // 👈 պարտադիր await

  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(category)}`,
    { next: { revalidate: 60 } }
  );

  const data: FilterResponse = await res.json();

  if (!data.meals || data.meals.length === 0) {
    return <p>No meals found in {category}</p>;
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Meals in {category}</h1>
      <MealList meals={data.meals} category={category} />
    </>
  );
}
