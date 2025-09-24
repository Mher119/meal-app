import MealPageUI from "@/ui/content/Meal";
import { MealApiResponse } from "@/ui/content/types";

type Meal = MealApiResponse["meals"][0];

type MealWithIngredients = {
  [key: `strIngredient${number}`]: string | null;
  [key: `strMeasure${number}`]: string | null;
};

function getIngredientsWithMeasures(meal: Meal & MealWithIngredients) {
  const list: { ingredient: string; measure: string }[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      list.push({ ingredient, measure: measure || "" });
    }
  }
  return list;
}

export default async function MealPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(
      id
    )}`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) return <p className="text-center mt-10">Failed to fetch meal</p>;

  const data: MealApiResponse = await res.json();

  if (!data.meals || data.meals.length === 0)
    return <p className="text-center mt-10">No meals found with ID {id}</p>;

  const meal = data.meals[0];
  const ingredients = getIngredientsWithMeasures(meal);

  return <MealPageUI meal={meal} ingredients={ingredients} />;
}
