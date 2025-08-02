import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";

export default function CreateRecipe() {
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: "",
  });

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    const updatedIngredients = [...recipe.ingredients];
    updatedIngredients[index] = value;
    setRecipe({ ...recipe, ingredients: updatedIngredients });
  };

  const handleAddIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  useEffect(() => {
    const userID = useGetUserID();
    if (userID === null) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="flex items-center justify-center py-12 w-full">
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          try {
            const response = await axios.post(
              "http://localhost:5000/recipes/create",
              {
                name: recipe.name,
                ingredients: recipe.ingredients,
                instructions: recipe.instructions,
                imageUrl: recipe.imageUrl,
                cookingTime: recipe.cookingTime,
                userOwner: useGetUserID(),
              }
            );
            if (response.data.message) {
              setNotification(response.data.message);
              navigate("/");
              return;
            }
            setNotification("Recipe created successfully!");
            setTimeout(() => {
              setNotification(null);
            }, 5000);
          } catch (error) {
            console.error(error);
            setNotification("An error occurred");
          }
        }}
        className="space-y-12 w-full max-w-md"
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12 ">
            <h2 className="text-2xl font-semibold text-center leading-7 text-gray-900">
              Create Recipe
            </h2>
            <p className="mt-1 text-md leading-6 text-center text-gray-600">
              Fill in the form to create a new recipe.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-md font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      onChange={(e) =>
                        setRecipe({ ...recipe, name: e.target.value })
                      }
                      value={recipe.name}
                      type="text"
                      name="name"
                      id="name"
                      required
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Chilli Panner"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-md font-medium leading-6 text-gray-900"
                >
                  Instructions
                </label>
                <div className="mt-2">
                  <textarea
                    onChange={(e) =>
                      setRecipe({ ...recipe, instructions: e.target.value })
                    }
                    value={recipe.instructions}
                    id="instructions"
                    name="instructions"
                    rows={3}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few instructions on how to prepare the recipe.
                </p>
                <div className="col-span-full">
                  <div className="mt-6">
                    <label
                      htmlFor="ingredients"
                      className="block text-md font-medium leading-6 text-gray-900"
                    >
                      Ingredients
                    </label>
                    <div className="mt-2 space-y-2">
                      <div className="flex flex-col gap-3">
                        {recipe.ingredients.map((ingredient, index) => (
                          <div
                            key={index}
                            className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                          >
                            <input
                              type="text"
                              value={ingredient}
                              onChange={(e) => handleInputChange(e, index)}
                              placeholder={`Ingredient ${index + 1}`}
                              className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            />
                          </div>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={handleAddIngredient}
                        className="rounded-md border border-indigo-600 bg-indigo-600 text-white py-1 px-4 hover:bg-indigo-700 focus:outline-none focus:ring-none focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Add Ingredient
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="imageUrl"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image URL
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) =>
                      setRecipe({ ...recipe, imageUrl: e.target.value })
                    }
                    id="imageUrl"
                    name="imageUrl"
                    type="text"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="time"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Cooking Time
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) =>
                      setRecipe({ ...recipe, cookingTime: e.target.value })
                    }
                    type="number"
                    name="time"
                    id="time"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <NavLink
            to="/"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </NavLink>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
        {notification && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Success! </strong>
            <span className="block sm:inline">{notification}</span>
          </div>
        )}
      </form>
    </div>
  );
}
