/**
 * Simulates solar energy generation based on time of day (Bell Curve).
 * Peak generation is at 12:00 PM.
 * @param {number} hour - Current hour (0-23)
 * @returns {number} - Generated Swing (kW)
 */
export const generateSolarOutput = (hour) => {
  // Simple bell curve simulation for 6AM to 6PM
  if (hour < 6 || hour > 18) return 0;
  
  const peak = 5.0; // 5kW peak system
  const center = 12;
  const spread = 2.5;
  
  // Gaussian function
  const generation = peak * Math.exp(-Math.pow(hour - center, 2) / (2 * Math.pow(spread, 2)));
  return Math.max(0, generation + (Math.random() * 0.2 - 0.1)); // Add slight noise
};

/**
 * Simulates household power consumption.
 * @returns {number} - Consumption (kW)
 */
export const generateConsumption = () => {
  const baseLoad = 0.5; // Fridge, standby devices
  const variableLoad = Math.random() * 1.5; // Lights, TV, etc.
  return baseLoad + variableLoad;
};

/**
 * Calculates current public grid tariff based on time.
 * @param {number} hour 
 * @returns {number} - Tariff in INR
 */
export const getPublicTariff = (hour) => {
  // Peak hours: 6PM - 10PM
  if (hour >= 18 && hour <= 22) return 22;
  return 20;
};
