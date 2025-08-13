// BMI Calculator with Health Insights - JavaScript Version

function calculateBMI(weight, height, units = "metric") {
    if (units === "imperial") {
        height = height * 0.0254; // inches to meters
        weight = weight * 0.453592; // lbs to kg
    }
    return +(weight / (height ** 2)).toFixed(2);
}

function bmiCategory(bmi) {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 24.9) return "Normal weight";
    if (bmi < 29.9) return "Overweight";
    return "Obese";
}

function healthyWeightRange(height) {
    const low = 18.5 * (height ** 2);
    const high = 24.9 * (height ** 2);
    return [low.toFixed(1), high.toFixed(1)];
}

function estimateBodyFat(bmi, age, gender) {
    return gender.toLowerCase() === "male"
        ? +(1.20 * bmi + 0.23 * age - 16.2).toFixed(1)
        : +(1.20 * bmi + 0.23 * age - 5.4).toFixed(1);
}

function calculateCalories(weight, height, age, gender, activityLevel = "moderate") {
    let bmr;
    if (gender.toLowerCase() === "male") {
        bmr = 88.362 + (13.397 * weight) + (4.799 * (height * 100)) - (5.677 * age);
    } else {
        bmr = 447.593 + (9.247 * weight) + (3.098 * (height * 100)) - (4.330 * age);
    }

    const factors = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725 };
    return Math.round(bmr * (factors[activityLevel] || 1.55));
}

// Example usage:
const units = "metric"; // or "imperial"
const weight = 70;
const height = 1.75;
const age = 25;
const gender = "male";

const bmi = calculateBMI(weight, height, units);
console.log(`BMI: ${bmi} (${bmiCategory(bmi)})`);
console.log(`Healthy weight range: ${healthyWeightRange(height).join(" - ")} kg`);
console.log(`Body Fat %: ${estimateBodyFat(bmi, age, gender)}`);
console.log(`Calories needed: ${calculateCalories(weight, height, age, gender)} kcal`);
