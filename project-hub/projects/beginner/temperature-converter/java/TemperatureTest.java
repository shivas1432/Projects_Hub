package projects.beginner.temperature_converter.java;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class TemperatureTest {

    @Test
    void testCelsiusToFahrenheit() {
        assertEquals(32, TemperatureConverter.celsiusToFahrenheit(0), 0.001);
        assertEquals(212, TemperatureConverter.celsiusToFahrenheit(100), 0.001);
    }

    @Test
    void testFahrenheitToCelsius() {
        assertEquals(0, TemperatureConverter.fahrenheitToCelsius(32), 0.001);
        assertEquals(100, TemperatureConverter.fahrenheitToCelsius(212), 0.001);
    }

    @Test
    void testCelsiusToKelvin() {
        assertEquals(273.15, TemperatureConverter.celsiusToKelvin(0), 0.001);
    }

    @Test
    void testKelvinToCelsius() {
        assertEquals(0, TemperatureConverter.kelvinToCelsius(273.15), 0.001);
    }

    @Test
    void testFahrenheitToKelvin() {
        assertEquals(273.15, TemperatureConverter.fahrenheitToKelvin(32), 0.001);
    }

    @Test
    void testKelvinToFahrenheit() {
        assertEquals(32, TemperatureConverter.kelvinToFahrenheit(273.15), 0.001);
    }
}
