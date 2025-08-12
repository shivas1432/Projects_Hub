package projects.beginner.temperature_converter.java;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class TemperatureConverter {

    private static List<String> history = new ArrayList<>();

    // Conversion methods
    public static double celsiusToFahrenheit(double c) {
        return (c * 9 / 5) + 32;
    }

    public static double fahrenheitToCelsius(double f) {
        return (f - 32) * 5 / 9;
    }

    public static double celsiusToKelvin(double c) {
        return c + 273.15;
    }

    public static double kelvinToCelsius(double k) {
        return k - 273.15;
    }

    public static double fahrenheitToKelvin(double f) {
        return celsiusToKelvin(fahrenheitToCelsius(f));
    }

    public static double kelvinToFahrenheit(double k) {
        return celsiusToFahrenheit(kelvinToCelsius(k));
    }

    // Menu display
    private static void showMenu() {
        System.out.println("\nTemperature Converter");
        System.out.println("1. Celsius to Fahrenheit");
        System.out.println("2. Fahrenheit to Celsius");
        System.out.println("3. Celsius to Kelvin");
        System.out.println("4. Kelvin to Celsius");
        System.out.println("5. Fahrenheit to Kelvin");
        System.out.println("6. Kelvin to Fahrenheit");
        System.out.println("7. Batch conversion");
        System.out.println("8. Show history");
        System.out.println("0. Exit");
        System.out.print("Choose an option: ");
    }

    private static void handleConversion(int choice, Scanner sc) {
        try {
            System.out.print("Enter value: ");
            double value = Double.parseDouble(sc.nextLine());
            double result;
            String record;

            switch (choice) {
                case 1:
                    result = celsiusToFahrenheit(value);
                    record = String.format("%.2f °C = %.2f °F", value, result);
                    break;
                case 2:
                    result = fahrenheitToCelsius(value);
                    record = String.format("%.2f °F = %.2f °C", value, result);
                    break;
                case 3:
                    result = celsiusToKelvin(value);
                    record = String.format("%.2f °C = %.2f K", value, result);
                    break;
                case 4:
                    result = kelvinToCelsius(value);
                    record = String.format("%.2f K = %.2f °C", value, result);
                    break;
                case 5:
                    result = fahrenheitToKelvin(value);
                    record = String.format("%.2f °F = %.2f K", value, result);
                    break;
                case 6:
                    result = kelvinToFahrenheit(value);
                    record = String.format("%.2f K = %.2f °F", value, result);
                    break;
                default:
                    System.out.println("Invalid option.");
                    return;
            }

            history.add(record);
            System.out.println("Result: " + record);
        } catch (NumberFormatException e) {
            System.out.println("Invalid input. Please enter a number.");
        }
    }

    private static void handleBatchConversion(Scanner sc) {
        try {
            System.out.print("Enter values separated by spaces: ");
            String[] inputs = sc.nextLine().trim().split("\\s+");
            System.out.print("Select conversion type (1-6): ");
            int type = Integer.parseInt(sc.nextLine());

            for (String s : inputs) {
                try {
                    double val = Double.parseDouble(s);
                    handleConversion(type, new Scanner(val + "\n")); // Pass value via a temp scanner
                } catch (NumberFormatException e) {
                    System.out.println("Skipping invalid input: " + s);
                }
            }
        } catch (Exception e) {
            System.out.println("Error in batch conversion.");
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int choice = -1;

        do {
            showMenu();
            try {
                choice = Integer.parseInt(sc.nextLine());
            } catch (NumberFormatException e) {
                System.out.println("Invalid option.");
                continue;
            }

            switch (choice) {
                case 1, 2, 3, 4, 5, 6 -> handleConversion(choice, sc);
                case 7 -> handleBatchConversion(sc);
                case 8 -> {
                    System.out.println("\nConversion History:");
                    if (history.isEmpty()) System.out.println("No history yet.");
                    else history.forEach(System.out::println);
                }
                case 0 -> System.out.println("Goodbye!");
                default -> System.out.println("Invalid option.");
            }

        } while (choice != 0);

        sc.close();
    }
}
