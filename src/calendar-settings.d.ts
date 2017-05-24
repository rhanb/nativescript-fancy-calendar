import { DISPLAY_MODE, SELECTION_MODE, SCROLL_ORIENTATION } from "./common";
export interface Settings {
    displayMode: DISPLAY_MODE;
    selectionMode: SELECTION_MODE;
    scrollOrientation: SCROLL_ORIENTATION;
    firstWeekday: number;
    minimumDate: Date;
    maximumDate: Date;
}
