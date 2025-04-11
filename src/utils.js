function generateID() {
    return `${Math.floor(Math.random() * 100000)}`;
  }
  
  export { generateID };