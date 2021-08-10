import storage from "./storage/storage";
import { getOriginalData } from "./getOriginalData";
import { getInterestList } from "./getInterestList";

export const LOCAL_STORAGE = storage(localStorage);

export const ORIGINAL_DATA = getOriginalData();

export const MIN_PRODUCT_ID = 0;

export const MAX_PRODUCT_ID = ORIGINAL_DATA.length;

export const INTEREST_LIST = getInterestList(MAX_PRODUCT_ID);
