export const getItem = (key) => {
  try {
    const serializedData = localStorage.getItem(key);
    return JSON.parse(serializedData);
  } catch (error) {
    console.error("Error retrieving data from local storage:", error);
    return null;
  }
};

export const setItem = (key, value) => {
  try {
    const serializedData = JSON.stringify(value);
    localStorage.setItem(key, serializedData);
  } catch (error) {
    console.error("Error storing data in local storage:", error);
  }
};

export const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing data from local storage:", error);
  }
};
