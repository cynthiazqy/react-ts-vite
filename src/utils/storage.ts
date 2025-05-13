export const setStorage = async (key: string, value: string, timeout?: number) => {
  try {
    localStorage.setItem(
      key,
      JSON.stringify({
        data: value,
        timeout: timeout ? Date.now() + timeout : 0,
      }),
    );
  } catch (error) {
    console.error('Error saving data', error);
  }
};

export const getStorage = (key: string) => {
  try {
    const value = localStorage.getItem(key);
    if (!value) {
      return null;
    }
    const { data, timeout } = JSON.parse(value);
    if (timeout > 0 && Date.now() > timeout) {
      return null;
    }
    return data;
  } catch (error) {
    console.error('Error reading data', error);
    return null;
  }
};

export const removeStorage = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing data', error);
  }
};

export const clearStorage = () => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Error clearing data', error);
  }
};
