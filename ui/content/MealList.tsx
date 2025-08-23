import { MealBrief } from "./types";
import PaginatedMealsGrid from "@/components/common/PaginatedMealsGrid";

type Props = {
  meals: MealBrief[];
  category: string;
};

export default function MealList({ meals, category }: Props) {
  return (
    <div className="container mx-auto">
      {meals.length > 0 ? (
        <PaginatedMealsGrid meals={meals} />
      ) : (
        <p>No Meals found for category {category}</p>
      )}
    </div>
  );
}

