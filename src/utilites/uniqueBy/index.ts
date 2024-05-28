export const uniqueById = (data) => {
  console.log("");
    const uniqueArray = Array.from(new Set(data.map(item => item.id))).map(id => {
    return data.find(item => item.id === id);
  });
  return uniqueArray
}
