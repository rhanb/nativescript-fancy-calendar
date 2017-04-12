import { Component } from "@angular/core";
import { Calendar, SELECTION_MODE, DISPLAY_MODE } from 'nativescript-fancy-calendar';
import { registerElement } from 'nativescript-angular';

declare const NSDate;

registerElement('Calendar', () => Calendar);
@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})
export class AppComponent {
    private displayMode: DISPLAY_MODE;
    private _calendar: Calendar;
    //private orientation: SCROLL_ORIENTATION;

    constructor() {
        //this.orientation = SCROLL_ORIENTATION.HORIZONTAL;
    }
    public calendarLoaded(event) {
        console.log('calendar loaded');
        this._calendar = <Calendar>event.object;
        this._calendar.selectedDateListener = function (widget, date) {
        };
        this._calendar.selectedMonthListener = function (widget, date) {
        };
        this._calendar.selectionColor = "green";
        this._calendar.arrowColor = "pink"
        this._calendar.selectionMode = SELECTION_MODE.MULTIPLE;
        this._calendar.displayMode = DISPLAY_MODE.WEEK;
        this._calendar.events = new Array(new Date());
        /*console.log('setting events');
        let today = new Date();
        let tommorow = {
            day: "Thu",
            date: 13
        }
        let tommorowValue = new Date();
        tommorowValue.setDate(tommorow.date);
        this._calendar.events = [
            new CalendarEvent(today)
        ];
        this._calendar.subtitles = [
            new CalendarSubtitle(new Date(), "test"),
        ];
        this._calendar.firstWeekday = 4;
        this._calendar.allowMultipleSelection = true;
        this._calendar.appearance = <Appearance>{
            weekdayTextColor: "yellow",
            headerTitleColor: "blue",
            eventColor: "green",
            selectionColor: "red",
            todayColor: "brown",
            todaySelectionColor: "white",
            borderRadius: 20
        }*/
    }

    /*public changeOrientation() {
        let newOrientation: SCROLL_ORIENTATION;
        this.orientation = this.orientation === SCROLL_ORIENTATION.HORIZONTAL ? SCROLL_ORIENTATION.VERTICAL : SCROLL_ORIENTATION.HORIZONTAL;
        this._calendar.scrollOrientation = this.orientation;
    }*/

    public changeDisplayMode() {
        let newDisplayMode: DISPLAY_MODE;
        this.displayMode = this.displayMode === DISPLAY_MODE.MONTH ? DISPLAY_MODE.WEEK : DISPLAY_MODE.MONTH;
        this._calendar.displayMode = this.displayMode;
    }
}

