import { CategoryList } from "@/ui/content/CategoryList";
import { CategoriesResponse } from "@/ui/content/types";

export default async function HomePage() {
  const res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php",
    { next: { revalidate: 60 } }
  );

  if (!res.ok) throw new Error("Failed to fetch categories");

  const data: CategoriesResponse = await res.json();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-3xl my-4">Meal Categories</h1>
      <CategoryList categories={data.categories} />
    </div>
  );
}

