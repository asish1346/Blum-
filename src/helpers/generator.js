class GeneratorHelper {
  constructor() {}

  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (ue) => {
      const Yi = (Math.random() * 16) | 0; // Generate random numbers from 0 to 15 (hexadecimal number)
      return (ue === "x" ? Yi : (Yi & 3) | 8).toString(16); // Convert random numbers to hexadecimal letters (hex)
    });
  }

  shuffleArray(arr) {
    // Copy the original array to leave it unchanged
    let shuffled = [...arr];

    // Use the Fisher-Yates algorithm to shuffle the array
    for (let i = shuffled.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap 2 elements
    }

    return shuffled;
  }

  getRandomElements(arr, x) {
    // Copy the array without changing the original array
    let shuffled = [...arr];
    shuffled = this.shuffleArray(shuffled);

    // Returns the first x elements from the merged array
    return shuffled.slice(0, x);
  }

  randomHex(n) {
    let result = "";
    const hexChars = "0123456789abcdef";
    for (let i = 0; i < n; i++) {
      result += hexChars[Math.floor(Math.random() * 16)];
    }
    return result;
  }

  randomFloat(n, m) {
    return (Math.random() * (m - n) + n).toFixed(3);
  }
}

const generatorHelper = new GeneratorHelper();
export default generatorHelper;
