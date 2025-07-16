export const HEADER_CONTAINER = "bg-white px-4 py-4 flex-shrink-0 z-50";
export const HEADER_LEFT_AREA = "flex items-center w-20 h-6";
export const HEADER_RIGHT_AREA = "flex items-center justify-end";
export const MAIN_CONTAINER = "flex-1 overflow-y-auto";

export const FLEX_LAYOUT = "h-full flex flex-col";
export const FLEX_CENTER = "flex items-center justify-between";
export const FLEX_WRAP = "flex flex-wrap";
export const FLEX_ITEMS_START = "flex items-start";
export const FLEX_ITEMS_START_BETWEEN = "flex items-start justify-between";
export const FLEX_ITEMS_CENTER = "flex items-center";
export const FLEX_ITEMS_SPACE = "flex items-center space-x-2";

export const NAV_CONTAINER = "bg-white border-b border-gray-200 sticky z-40";
export const NAV_ITEM_BASE = "flex items-center space-x-2 px-4 py-3 border-b-2";
export const NAV_ITEM_LABEL = "text-sm font-medium";
export const NAV_ITEM_ACTIVE = "border-black text-black";
export const NAV_ITEM_INACTIVE = "border-transparent text-gray-600";

export const TAB_BUTTON_BASE = "flex-1 py-3 px-4 text-center font-medium";
export const TAB_BUTTON_ACTIVE = "text-black border-b-2 border-black";
export const TAB_BUTTON_INACTIVE = "text-gray-600 hover:text-gray-900";

export const CART_BOTTOM_CONTAINER =
  "fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[468px] bg-white border-t border-gray-200 p-4 z-50";
export const CART_EMPTY_CONTAINER =
  "flex flex-col items-center justify-center min-h-[60vh]";

export const DEAL_NAV_CONTAINER =
  "flex justify-around items-center py-4 bg-white";
export const DEAL_NAV_LINK = "flex flex-col items-center space-y-2";
export const DEAL_NAV_ICON_BASE =
  "w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold";
export const DEAL_NAV_ICON_ACTIVE = "bg-black text-white scale-105";
export const DEAL_NAV_ICON_INACTIVE = "bg-gray-100 text-gray-500";
export const DEAL_NAV_LABEL_BASE = "text-sm font-medium";
export const DEAL_NAV_LABEL_ACTIVE = "text-black";
export const DEAL_NAV_LABEL_INACTIVE = "text-gray-500";

export const TITLE = "text-lg font-bold text-gray-900";
export const OPTION_TEXT = "text-sm text-gray-600";
export const DISCOUNT_RATE_TEXT = "text-2xl font-bold text-red-500";
export const DISCOUNT_PRICE_TEXT = "text-2xl font-bold text-gray-900";
export const BASE_PRICE_TEXT = "text-m text-gray-500 line-through";
export const EMPTY_STATE_TEXT = "text-gray-500 text-xl mb-4";

export const ICON = "w-5 h-5 text-gray-700";
export const SWIPE_CONTAINER = "h-full cursor-grab active:cursor-grabbing";
export const CART_ALERT =
  "absolute -top-3 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center min-w-[20px] font-medium";
export const BACK_BUTTON =
  "absolute top-4 left-4 z-50 flex items-center justify-center";
export const SUBMIT_BUTTON = "w-full h-12 text-lg";

export const PRODUCT_IMAGE_CONTAINER = {
  small: "relative w-16 h-16 overflow-hidden rounded-md",
  medium: "relative w-full aspect-square mb-2 overflow-hidden rounded-lg",
  large: "relative w-full aspect-square overflow-hidden",
};

export const PRODUCT_PRICE_SIZE = {
  small: {
    main: "text-sm font-bold text-gray-900",
    secondary: "text-xs text-gray-500 line-through ml-1",
    discount: "text-xs font-bold text-red-500",
  },
  medium: {
    main: "text-lg font-bold text-gray-900",
    secondary: "text-sm text-gray-500 line-through ml-1",
    discount: "text-sm font-bold text-red-500",
  },
  large: {
    main: DISCOUNT_PRICE_TEXT,
    secondary: BASE_PRICE_TEXT,
    discount: DISCOUNT_RATE_TEXT,
  },
};