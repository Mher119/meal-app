import MealPageUI from "@/ui/content/Meal";
import { MealApiResponse } from "@/ui/content/types";

type Meal = MealApiResponse["meals"][0];
type MealWithIngredients = {
  [key: `strIngredient${number}`]: string | null;
  [key: `strMeasure${number}`]: string | null;
};

interface Props {
  params: {
    id: string;
  };
}

// Extract ingredients safely
function getIngredientsWithMeasures(meal: Meal & MealWithIngredients) {
  const list: { ingredient: string; measure: string }[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient?.trim()) list.push({ ingredient, measure: measure || "" });
  }
  return list;
}

// ✅ App Router async page function
export default async function MealPage({ params }: Props) {
  const id = params.id; // synchronous destructuring

  try {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(id)}`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) return <p className="text-center mt-10">Failed to fetch meal</p>;

    const data: MealApiResponse = await res.json();
    const meal = data.meals?.[0];

    if (!meal) return <p className="text-center mt-10">No meals found with ID {id}</p>;

    const ingredients = getIngredientsWithMeasures(meal);
    const videoId = meal.strYoutube?.split("v=")[1]?.split("&")[0];

    return (
      <div>
        <MealPageUI meal={meal} ingredients={ingredients} />
        {videoId && (
          <div className="mt-8">
            <iframe
              width="100%"
              height="400"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error loading meal:", error);
    return <p className="text-center mt-10">Error loading meal data</p>;
  }
}
