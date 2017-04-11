import { View } from 'ui/core/view';
import { Color } from "color";

declare const FSCalendar,
    FSCalendarScrollDirectionVertical,
    FSCalendarScrollDirectionHorizontal,
    FSCalendarScopeWeek,
    FSCalendarScopeMonth,
    FSCalendarDelegate,
    FSCalendarDataSource
    CGRectMake;

export enum SCROLL_ORIENTATION {
    "VERTICAL" = FSCalendarScrollDirectionVertical,
    "HORIZONTAL" = FSCalendarScrollDirectionHorizontal
}
export enum DISPLAY_MODE {
    "WEEK" = FSCalendarScopeWeek,
    "MONTH" = FSCalendarScopeMonth
}
export interface Appearance {
    weekdayTextColor: string,
    headerTitleColor: string,
    eventColor: string,
    selectionColor: string,
    todayColor: string,
    todaySelectionColor: string,
    borderRadius: number
}

class CalendarDelegate extends NSObject {
    public static ObjCProtocols = [FSCalendarDelegate];
    private _owner: WeakRef<Calendar>;

    public static initWithOwner(owner: WeakRef<Calendar>): CalendarDelegate {
        let delegate = <CalendarDelegate>CalendarDelegate.new();
        delegate._owner = owner;
        return delegate;
    }
    public calendarDidSelectDate(calendar, date: NSDate){
        console.log('calendarDidSelectDate');
        this._owner.get().dateSelected(date);
    }
}

class CalendarDataSource extends NSObject {
    public static ObjCProtocols = [FSCalendarDataSource];
    private _owner: WeakRef<Calendar>;

    public static initWithOwner(owner: WeakRef<Calendar>): CalendarDataSource {
        let source = <CalendarDataSource>CalendarDataSource.new();
        source._owner = owner;
        return source;
    }
    public calendarHasEventForDate(calendar, date: NSDate): boolean {
        console.log("calendarHasEventForDate");
        this._owner.get().dateHasEvent(date);
        return true;
    }

}
export class Calendar extends View {

    private _ios: any;
    private _scrollOrientation: SCROLL_ORIENTATION;
    private _displayMode: DISPLAY_MODE;
    private _allowsMultipleSelection: boolean;
    private _firstWeekday: number;
    private _appearance: Appearance;

    constructor() {
        super();
        this._ios = FSCalendar.alloc().initWithFrame(CGRectMake(0, 0, 0, 0));
        this._ios.delegate = CalendarDelegate.initWithOwner(new WeakRef(this));
        this._ios.dataSource = CalendarDataSource.initWithOwner(new WeakRef(this));
        this._scrollOrientation = SCROLL_ORIENTATION.HORIZONTAL;
        this._displayMode = DISPLAY_MODE.MONTH;
        this._allowsMultipleSelection = false;
        this._firstWeekday = 1
        this._appearance = <Appearance>{
            weekdayTextColor: "",
            headerTitleColor: "",
            eventColor: "",
            selectionColor: "",
            todayColor: "",
            todaySelectionColor: "",
            borderRadius: 0
        }
    }

    public get ios() {
        return this._ios;
    }

    public get _nativeView() {
        return this._ios;
    }

    public get scrollOrientation(): SCROLL_ORIENTATION {
        return this._scrollOrientation;
    }

    public set scrollOrientation(scrollOrientationValue: SCROLL_ORIENTATION) {
        if (scrollOrientationValue !== this._scrollOrientation) {
            this._scrollOrientation = scrollOrientationValue;
            this._ios.scrollDirection = this._scrollOrientation;
        }

    }

    public get displayMode(): DISPLAY_MODE {
        return this._displayMode
    }

    public set displayMode(displayModeValue: DISPLAY_MODE) {
        if (displayModeValue !== this._displayMode) {
            this._displayMode = displayModeValue;
            this._ios.scope = this._displayMode;
        }
    }

    public get allowMultipleSelection(): boolean {
        return this._allowsMultipleSelection;
    }

    public set allowMultipleSelection(multipleSelectionValue: boolean) {
        if (this._allowsMultipleSelection !== multipleSelectionValue) {
            this._allowsMultipleSelection = multipleSelectionValue;
            this._ios.allowsMultipleSelection = this._allowsMultipleSelection;
        }
    }

    public get firstWeekday(): number {
        return this._firstWeekday;
    }

    public set firstWeekday(firstWeekDayValue: number) {
        if (this._firstWeekday !== firstWeekDayValue) {
            this._firstWeekday = firstWeekDayValue <= 7 && this._firstWeekday > 0 ? 1 : firstWeekDayValue;
            this._ios.firstWeekday = this._firstWeekday;
        }

    }

    public get appearance(): Appearance {
        return this._appearance;
    }

    public set appearance(appearanceValue: Appearance) {
        if (appearanceValue !== this._appearance) {
            this.weekdayTextColor = appearanceValue.weekdayTextColor;
            this.headerTitleColor = appearanceValue.headerTitleColor;
            this.eventColor = appearanceValue.eventColor;
            this.selectionColor = appearanceValue.selectionColor;
            this.todayColor = appearanceValue.todayColor;
            this.todaySelectionColor = appearanceValue.todaySelectionColor;
            this.borderRadiusSelectedDay = appearanceValue.borderRadius;
        }
    }

    private set weekdayTextColor(colorValue: string) {
        if (this._appearance.weekdayTextColor !== colorValue) {
            this._appearance.weekdayTextColor = colorValue;
            this._ios.appearance.weekdayTextColor = new Color(this._appearance.weekdayTextColor).ios;
        }
    }
    private set headerTitleColor(colorValue: string) {
        if (this._appearance.headerTitleColor !== colorValue) {
            this._appearance.headerTitleColor = colorValue;
            this._ios.appearance.headerTitleColor = new Color(this._appearance.headerTitleColor).ios;
        }
    }
    private set eventColor(colorValue: string) {
        if (this._appearance.eventColor !== colorValue) {
            this._appearance.eventColor = colorValue;
            this._ios.appearance.eventColor = new Color(this._appearance.eventColor).ios;
        }
    }
    private set selectionColor(colorValue: string) {
        if (this._appearance.selectionColor !== colorValue) {
            this._appearance.selectionColor = colorValue;
            this._ios.appearance.selectionColor = new Color(this._appearance.selectionColor).ios;
        }
    }
    private set todayColor(colorValue: string) {
        if (this._appearance.todayColor !== colorValue) {
            this._appearance.todayColor = colorValue;
            this._ios.appearance.todayColor = new Color(this._appearance.todayColor).ios;
        }
    }
    private set todaySelectionColor(colorValue: string) {
        if (this._appearance.todaySelectionColor !== colorValue) {
            this._appearance.todaySelectionColor = colorValue;
            this._ios.appearance.todaySelectionColor = new Color(this._appearance.todaySelectionColor).ios;
        }
    }

    private set borderRadiusSelectedDay(borderRadiusValue: number) {
        if (this._appearance.borderRadius !== borderRadiusValue) {
            this._appearance.borderRadius = borderRadiusValue;
            this._ios.appearance.borderRadius = this._appearance.borderRadius;
        }
    }

    public dateSelected(date) {
        console.log('dateSelected');
        console.dir(date);
    }

    public dateHasEvent(date) {
        console.log('dateHasEvent');
    }

    onLoaded() {
        super.onLoaded();
        if (this.width && this.height) {
            this._ios.frame = CGRectMake(0, 0, this.width, this.height);
        } else {
            this._ios.frame = CGRectMake(0, 0, 300, 300);
        }
    }
}