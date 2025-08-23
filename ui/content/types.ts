
// types.ts

export type MealBrief = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

export type FilterResponse = {
  meals: MealBrief[];
};

export type Category = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

export type CategoriesResponse = {
  categories: Category[];
};


export type LoopupResponse = {
  ingredient: string;
  measure: string;
};

export type MealApiResponse = {
  meals: {
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
    strMealThumb: string;
    strYoutube?: string;
    strIngredient1?: string;
    strIngredient2?: string;
    // ... մինչև 20
    strIngredient20?: string;
    strMeasure1?: string;
    strMeasure2?: string;
    strMeasure20?: string;
  }[];
};

