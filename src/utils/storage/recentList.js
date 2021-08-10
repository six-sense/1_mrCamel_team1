import { LOCAL_STORAGE } from "../constants";

const update = async (productId) => {
  const recentList = await LOCAL_STORAGE.get("recentList");
  if (!recentList) {
    return null;
  }

  const id = parseInt(productId);
  const recentItem = {
    id,
    dislike: false,
  };
  const newRecentList = removeDuplicatedItemById(
    await LOCAL_STORAGE.get("recentList"),
    id
  );
  await LOCAL_STORAGE.set("recentList", [recentItem, ...newRecentList]);
};

const dislike = async (productId) => {
  const recentList = await LOCAL_STORAGE.get("recentList");
  recentList.find((item) => item.id === productId).dislike = true;
  await LOCAL_STORAGE.set("recentList", recentList);
};

export default {
  update,
  dislike,
};

const removeDuplicatedItemById = (arr, id) => {
  return arr.filter((item) => item.id !== id);
};
