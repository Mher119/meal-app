'use client';
import Image from "next/image";

type Ingredient = {
  ingredient: string;
  measure: string;
};

type MealProps = {
  meal: {
    strCategory: string;
    strArea: string;
    strMealThumb: string;
    strMeal: string;
    strYoutube?: string;
  };
  ingredients: Ingredient[];
};

export default function MealPageUI({ meal, ingredients }: MealProps) {
  const videoId = meal.strYoutube?.split("v=")[1]?.split("&")[0];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
      <Image
        src={meal.strMealThumb}
        alt={meal.strMeal}
        width={400}
        height={300}
        className="rounded shadow-md object-cover"
        priority
      />

      <div className="mb-4 text-green-800">
        <p><strong>Category:</strong> {meal.strCategory}</p>
        <p><strong>Area:</strong> {meal.strArea}</p>
      </div>

      <h2 className="text-2xl font-semibold text-green-900 mb-3">Ingredients</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6 list-disc list-inside text-green-800">
        {ingredients.map((item, idx) => (
          <li key={idx}>{item.ingredient} — {item.measure}</li>
        ))}
      </ul>

       {meal.strYoutube && (
        <a
          href={meal.strYoutube}
          target="_blank"
          className="inline-block text-green-900 font-semibold hover:text-green-700 transition-colors duration-200 underline"
        >
          ▶ Watch on YouTube
        </a>
      )}

      {videoId && (
        <div className="mt-6">
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
}



// 'use client';
// import Image from "next/image";

// type Ingredient = {
//   ingredient: string;
//   measure: string;
// };

// type MealProps = {
//   meal: {
//     strCategory: string;
//     strArea: string;
//     strMealThumb: string;
//     strMeal: string;
//     strYoutube?: string;
//   };
//   ingredients: Ingredient[];
// };

// export default function Meal({ meal, ingredients }: MealProps) {
//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">

//       <Image
//          src={meal.strMealThumb}
//          alt={meal.strMeal}
//          width={400}
//          height={300}
//          className="rounded shadow-md object-cover"
//          priority
//       />

//       <div className="mb-4 text-green-800">
//         <p>
//           <strong>Category:</strong> {meal.strCategory}
//         </p>
//         <p>
//           <strong>Area:</strong> {meal.strArea}
//         </p>
//       </div>

//       <h2 className="text-2xl font-semibold text-green-900 mb-3">Ingredients</h2>
//       <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6 list-disc list-inside text-green-800">
//         {ingredients.map((item, idx) => (
//           <li key={idx}>
//             {item.ingredient} — {item.measure}
//           </li>
//         ))}
//       </ul>

//       {meal.strYoutube && (
//         <a
//           href={meal.strYoutube}
//           target="_blank"
//           className="inline-block text-green-900 font-semibold hover:text-green-700 transition-colors duration-200 underline"
//         >
//           ▶ Watch on YouTube
//         </a>
//       )}
//     </div>
//   );
// }
