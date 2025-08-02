import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import SavedCard from "../components/SavedCard";
import { useNavigate } from "react-router-dom";

import { useGetUserID } from "../hooks/useGetUserID";
const SavedRecipe = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [detailedRecipes, setDetailedRecipes] = useState([]);
  const userID = useGetUserID();
  const navigate = useNavigate();

  useEffect(() => {
    const userID = useGetUserID();
    if (userID === null) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/recipes/saved/" + userID
        );
        setSavedRecipes(response.data);
      } catch (error) {
        console.error("Error fetching saved recipes:", error);
      }
    };

    fetchSavedRecipes();
  }, [userID]);

  useEffect(() => {
    const fetchDetailedRecipes = async () => {
      try {
        const detailedRecipesPromises = savedRecipes.map(
          async (savedRecipe) => {
            const response = await axios.get(
              `http://localhost:5000/recipes/${savedRecipe}`
            );
            return response.data;
          }
        );

        const detailedRecipesData = await Promise.all(detailedRecipesPromises);
        setDetailedRecipes(detailedRecipesData);
      } catch (error) {
        console.error("Error fetching detailed recipes:", error);
      }
    };

    fetchDetailedRecipes();
  }, [savedRecipes]);
  return (
    <div className="flex-col items-center justify-center py-6 w-full">
      <div className="">
        <h1 className="text-2xl font-semibold text-center leading-7 text-gray-900">
          Saved Recipes
        </h1>
      </div>
      <div className="w-full mt-4 mx-auto flex justify-center items-center px-4 md:px-28 lg:px-40 xl:px-96">
        <div className="flex flex-col gap-5">
          {detailedRecipes.map((recipe) => (
            <SavedCard
              key={recipe._id}
              name={recipe.name}
              imageUrl={recipe.imageUrl}
              ingredients={recipe.ingredients}
              instructions={recipe.instructions}
              cookingTime={recipe.cookingTime}
              userName={recipe.username}
              id={recipe._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavedRecipe;
