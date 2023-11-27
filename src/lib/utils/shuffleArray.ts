export default function shuffleArray(array: any[]) {
    let arrayCopy = [...array];
    let currentIndex = array.length, randomIndex;
  
    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [arrayCopy[currentIndex], arrayCopy[randomIndex]] = [
        arrayCopy[randomIndex], arrayCopy[currentIndex]
      ];
    }
  
    return arrayCopy;
  }
  