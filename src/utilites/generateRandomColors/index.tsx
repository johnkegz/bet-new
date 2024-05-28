// Custom pseudo-random number generator function
function customRandom(seed) {
  // Initialize the seed value
  let state = seed;
  // Custom pseudo-random number generator algorithm
  function random() {
    // Implementation of a simple linear congruential generator (LCG)
    state = (state * 9301 + 49297) % 233280;
    return state / 233280;
  }

  // Return a function that generates random numbers based on the current seed
  return function() {
    return random();
  };
}

// Function to generate a random color in RGBA format with a fixed seed
function getRandomColor(seed) {
  // Use the seed to initialize the random number generator
  const rng = customRandom(seed);
  // Generate random values for red, green, and blue (0-255)
  const red = Math.floor(rng() * 256);
  const green = Math.floor(rng() * 256);
  const blue = Math.floor(rng() * 256);
  // Set alpha to 1 for fully opaque
  const alpha = 1;
  // Return the color in RGBA format
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

// Example usage: generate a random color with a fixed seed
// const seed = 'exampleSeed'; // Change this seed value to generate different colors

export const generateColorRamp = (numColors) => {
  const colorRamp = [];
  for (let i = 0; i < numColors; i++) {
    colorRamp.push(getRandomColor(i));
  }
  return colorRamp;
}
