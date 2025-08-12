

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;

public class TemperatureGUI extends JFrame {

    private JComboBox<String> conversionType;
    private JTextField inputField;
    private JTextArea historyArea;

    public TemperatureGUI() {
        setTitle("Temperature Converter");
        setSize(400, 300);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(new BorderLayout());

        // Input panel
        JPanel inputPanel = new JPanel(new FlowLayout());
        inputField = new JTextField(10);

        String[] conversions = {
                "Celsius to Fahrenheit",
                "Fahrenheit to Celsius",
                "Celsius to Kelvin",
                "Kelvin to Celsius",
                "Fahrenheit to Kelvin",
                "Kelvin to Fahrenheit"
        };

        conversionType = new JComboBox<>(conversions);
        JButton convertBtn = new JButton("Convert");

        inputPanel.add(new JLabel("Value:"));
        inputPanel.add(inputField);
        inputPanel.add(conversionType);
        inputPanel.add(convertBtn);

        // History panel
        historyArea = new JTextArea();
        historyArea.setEditable(false);
        JScrollPane scrollPane = new JScrollPane(historyArea);

        add(inputPanel, BorderLayout.NORTH);
        add(scrollPane, BorderLayout.CENTER);

        convertBtn.addActionListener(this::performConversion);
    }

    private void performConversion(ActionEvent e) {
        try {
            double value = Double.parseDouble(inputField.getText());
            double result;
            String record;

            switch (conversionType.getSelectedIndex()) {
                case 0 -> {
                    result = TemperatureConverter.celsiusToFahrenheit(value);
                    record = String.format("%.2f °C = %.2f °F", value, result);
                }
                case 1 -> {
                    result = TemperatureConverter.fahrenheitToCelsius(value);
                    record = String.format("%.2f °F = %.2f °C", value, result);
                }
                case 2 -> {
                    result = TemperatureConverter.celsiusToKelvin(value);
                    record = String.format("%.2f °C = %.2f K", value, result);
                }
                case 3 -> {
                    result = TemperatureConverter.kelvinToCelsius(value);
                    record = String.format("%.2f K = %.2f °C", value, result);
                }
                case 4 -> {
                    result = TemperatureConverter.fahrenheitToKelvin(value);
                    record = String.format("%.2f °F = %.2f K", value, result);
                }
                case 5 -> {
                    result = TemperatureConverter.kelvinToFahrenheit(value);
                    record = String.format("%.2f K = %.2f °F", value, result);
                }
                default -> {
                    JOptionPane.showMessageDialog(this, "Invalid conversion type");
                    return;
                }
            }

            historyArea.append(record + "\n");

        } catch (NumberFormatException ex) {
            JOptionPane.showMessageDialog(this, "Please enter a valid number", "Error", JOptionPane.ERROR_MESSAGE);
        }
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> new TemperatureGUI().setVisible(true));
    }
}
