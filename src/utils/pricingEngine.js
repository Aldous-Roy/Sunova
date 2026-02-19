/**
 * Pricing Constants
 */
export const PRICING = {
    PUBLIC_GRID_TARIFF: 20, // INR per kWh
    VOLTNEST_TARIFF: 14, // INR per kWh
    FEED_IN_TARIFF: 3, // INR per kWh
  };
  
  /**
   * Calculates savings for an EV user.
   * @param {number} kwh - Amount of energy to charge
   * @returns {object} - Savings details
   */
  export const calculateSavings = (kwh) => {
    const publicCost = kwh * PRICING.PUBLIC_GRID_TARIFF;
    const platformCost = kwh * PRICING.VOLTNEST_TARIFF;
    const savings = publicCost - platformCost;
    const savingsPercent = ((savings / publicCost) * 100).toFixed(0);
  
    return {
      publicCost,
      platformCost,
      savings,
      savingsPercent
    };
  };
