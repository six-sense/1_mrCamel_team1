import productData from "./productData.json";

export const getOriginalData = () => {
  const tempArray = [];
  productData.forEach((product, idx) => {
    tempArray.push({
      ...product,
      id: idx,
      imgUrl: `https://picsum.photos/seed/${idx + 1}/200/200`,
    });
  });
  return tempArray;
};
