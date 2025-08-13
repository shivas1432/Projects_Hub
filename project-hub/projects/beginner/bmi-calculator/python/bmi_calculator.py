import java.util.Scanner;

public class BMICalculator {
    public static double calculateBMI(double weight, double height, String units) {
        if (units.equalsIgnoreCase("imperial")) {
            height = height * 0.0254;
            weight = weight * 0.453592;
        }
        return Math.round((weight / (height * height)) * 100.0) / 100.0;
    }

    public static String bmiCategory(double bmi) {
        if (bmi < 18.5) return "Underweight";
        else if (bmi < 24.9) return "Normal weight";
        else if (bmi < 29.9) return "Overweight";
        else return "Obese";
    }

    public static double[] healthyWeightRange(double height) {
        double low = 18.5 * (height * height);
        double high = 24.9 * (height * height);
        return new double[]{Math.round(low * 10.0) / 10.0, Math.round(high * 10.0) / 10.0};
    }

    public static double estimateBodyFat(double bmi, int age, String gender) {
        if (gender.equalsIgnoreCase("male")) {
            return Math.round((1.20 * bmi + 0.23 * age - 16.2) * 10.0) / 10.0;
        } else {
            return Math.round((1.20 * bmi + 0.23 * age - 5.4) * 10.0) / 10.0;
        }
    }

    public static int calculateCalories(double weight, double height, int age, String gender, String activityLevel) {
        double bmr;
        if (gender.equalsIgnoreCase("male")) {
            bmr = 88.362 + (13.397 * weight) + (4.799 * (height * 100)) - (5.677 * age);
        } else {
            bmr = 447.593 + (9.247 * weight) + (3.098 * (height * 100)) - (4.330 * age);
        }

        double factor;
        switch (activityLevel.toLowerCase()) {
            case "sedentary": factor = 1.2; break;
            case "light": factor = 1.375; break;
            case "active": factor = 1.725; break;
            default: factor = 1.55;
        }
        return (int)Math.round(bmr * factor);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Units (metric/imperial): ");
        String units = sc.nextLine();

        System.out.print("Weight (" + (units.equalsIgnoreCase("metric") ? "kg" : "lbs") + "): ");
        double weight = sc.nextDouble();

        System.out.print("Height (" + (units.equalsIgnoreCase("metric") ? "m" : "inches") + "): ");
        double height = sc.nextDouble();

        System.out.print("Age: ");
        int age = sc.nextInt();
        sc.nextLine();

        System.out.print("Gender (male/female): ");
        String gender = sc.nextLine();

        double bmi = calculateBMI(weight, height, units);
        String category = bmiCategory(bmi);
        double[] range = healthyWeightRange(units.equalsIgnoreCase("metric") ? height : height * 0.0254);
        double bodyFat = estimateBodyFat(bmi, age, gender);
        int calories = calculateCalories(
                units.equalsIgnoreCase("metric") ? weight : weight * 0.453592,
                units.equalsIgnoreCase("metric") ? height : height * 0.0254,
                age, gender, "moderate");

        System.out.println("\nBMI: " + bmi + " (" + category + ")");
        System.out.println("Healthy weight range: " + range[0] + " kg - " + range[1] + " kg");
        System.out.println("Estimated body fat: " + bodyFat + "%");
        System.out.println("Recommended daily calories: " + calories + " kcal");
    }
}
