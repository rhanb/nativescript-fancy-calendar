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

export class CalendarEvent {
    private _date: any;
    private _source: string;

    constructor(eventDate: any, eventSource?: string) {
        this._date = eventDate;
        if (eventSource) {
            this._source = eventSource;
        }
    }

    public get date(): any {
        return this._date;
    }

    public set date(eventDate: any) {
        this._date = eventDate;
    }

    public get source(): string {
        return this._source;
    }

    public set source(eventSource: string) {
        this._source = eventSource;
    }
}

export class CalendarSubtitle {
    private _date: any;
    private _text: string
    constructor(subtitleDate: any, subtitleText: string) {
        this._date = subtitleDate;
        this._text = subtitleText;
    }

    public get date() {
        return this._date;
    }

    public set date(subtitleDate: any) {
        this._date = subtitleDate;
    }

    public get text(): string {
        return this._text;
    }

    public set text(subtitleText: string) {
        this._text = subtitleText;
    }
}
class CalendarDelegate extends NSObject {
    public static ObjCProtocols = [FSCalendarDelegate];
    private _owner: WeakRef<Calendar>;

    public static initWithOwner(owner: WeakRef<Calendar>): CalendarDelegate {
        let delegate = <CalendarDelegate>CalendarDelegate.new();
        delegate._owner = owner;
        return delegate;
    }
    public calendarDidSelectDate(calendar, date: any) {
        console.log('calendarDidSelectDate');
        this._owner.get().dateSelected(date);
    }
    public calendarCurrentPageDidChange(calendar) {
        this._owner.get().pageChanged();
    }

    public calendarBoundingRectWillChange(calendar, bounds, animated) {
        console.log('calendarBoundingWillChange');
        this._owner.get().ios.frame = CGRectMake(calendar.frame.origin.x, calendar.frame.origin.y, bounds.size.width, bounds.size.height);
    }

    public calendarCurrentScopeWillChangeAnimated (calendar, animated: boolean): void {
        console.log(animated);
        console.log('calendarCurrentScopeWillChangeAnimated')
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
    public calendarHasEventForDate(calendar, date: any): boolean {
        return this._owner.get().dateHasEvent(date);
    }

    public calendarSubtitleForDate(calendar, date: any): string {
        return this._owner.get().dateHasSubtitle(date);
    }

    public calendarImageForDate(calendar, date: any): string {
        return this._owner.get().dateHasEventImage(date);
    }
    public calendarMinimumDateForCalendar(calendar, date: any): any {
        return this._owner.get().minimumDate;
    }

    public calendarMaxDateForCalendar(calendar, date: any): any {
        return this._owner.get().maximumDate;
    }

}
export class Calendar extends View {

    private _ios: any;
    private _scrollOrientation: SCROLL_ORIENTATION;
    private _displayMode: DISPLAY_MODE;
    private _allowsMultipleSelection: boolean;
    private _firstWeekday: number;
    private _appearance: Appearance;
    private _events: Array<CalendarEvent>;
    private _subtitles: Array<CalendarSubtitle>;
    private _hasBorder: boolean;
    private _maximumDate: Date;
    private _minimumDate: Date;

    constructor() {
        super();
        this._ios = FSCalendar.alloc().initWithFrame(CGRectMake(0, 0, 0, 0));
        this._ios.delegate = CalendarDelegate.initWithOwner(new WeakRef(this));
        this._ios.dataSource = CalendarDataSource.initWithOwner(new WeakRef(this));
        this._scrollOrientation = SCROLL_ORIENTATION.HORIZONTAL;
        this._displayMode = DISPLAY_MODE.MONTH;
        this._allowsMultipleSelection = false;
        this._firstWeekday = 1
        this._hasBorder = true;
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
            console.log(this._firstWeekday);
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
            console.log(this._appearance.borderRadius);
            this._ios.appearance.borderRadius = this._appearance.borderRadius;
        }
    }

    public set events(calendarEvents: Array<CalendarEvent>) {
        if (this._events !== calendarEvents) {
            this._events = calendarEvents;
        }
    }

    public get events(): Array<CalendarEvent> {
        return this._events;
    }

    public set subtitles(calendarSubtitles: Array<CalendarSubtitle>) {
        if (this._subtitles !== calendarSubtitles) {
            this._subtitles = calendarSubtitles;
        }
    }

    public dateSelected(date) {
        console.log('dateSelected');
        console.dir(date);
    }

    public pageChanged() {
        console.log('page changed');
    }

    public dateHasEvent(date): boolean {
        let i = 0, found = false;
        while (!found && i < this._events.length) {
            if (this.isSameDate(date, this._events[i].date) && !this._events[i].source) {
                found = true;
            }
            i++;
        }
        return found;
    }
    public dateHasEventImage(date): string {
        let i = 0, found = undefined;
        while (!found && i < this._events.length) {
            if (this.isSameDate(date, this._events[i].date) && this._events[i].source) {
                found = this._events[i].source;
            }
            i++;
        }
        return found;
    }

    public dateHasSubtitle(date): string {
        let i = 0, found = undefined;
        while (!found && i < this._subtitles.length) {
            if (this.isSameDate(date, this._subtitles[i].date)) {
                found = this._subtitles[i].text;
            }
            i++;
        }
        return found;
    }

    private isSameDate(dateOne, dateTwo) {
        return dateOne.getMonth() === dateTwo.getMonth() && dateOne.getDay() === dateTwo.getDay() && dateOne.getYear() === dateTwo.getYear() && dateOne.getDate() === dateTwo.getDate();
    }

    public get hasBorder(): boolean {
        return this._hasBorder;
    }

    public set hasBorder(calendarHasBorder: boolean) {
        if (this._hasBorder !== calendarHasBorder) {
            this._ios.clipsToBounds = this._hasBorder;
        }
    }

    public get maximumDate(): Date {
        return this._maximumDate;
    }

    public set maximumDate(calendarMaxDate: Date) {
        if (this._maximumDate !== calendarMaxDate) {
            this._maximumDate = calendarMaxDate;
        }
    }

    public get minimumDate(): Date {
        return this._minimumDate
    }

    public set minimumDate(calendarMinDate: Date) {
        if (this._minimumDate !== calendarMinDate) {
            this._minimumDate = calendarMinDate;
        }
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