import { Component } from "@angular/core";
import { Calendar, SELECTION_MODE, DISPLAY_MODE, CalendarEvent, Appearance } from 'nativescript-fancy-calendar';

import { registerElement } from 'nativescript-angular';
import { Color } from "color";
import { SCROLL_ORIENTATION } from "nativescript-fancy-calendar";

declare const NSDate;

registerElement('Calendar', () => Calendar);
@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})
export class AppComponent {
    private displayMode: DISPLAY_MODE;
    private _calendar: Calendar;
    private scrollOrientation: SCROLL_ORIENTATION;

    public calendarLoaded(event) {
        console.log('calendar loaded');
        this._calendar = <Calendar>event.object;
        this._calendar.selectionMode = SELECTION_MODE.MULTIPLE;
        this._calendar.events = new Array(new CalendarEvent(new Date()));
        this._calendar.appearance = <Appearance>{
            weekdayTextColor: "white",
            headerTitleColor: "white",
            eventColor: "#F78200",
            selectionColor: "black",
            todayColor: "#FF8000",
            todaySelectionColor: "white",
            borderRadius: 25
        };
        let _that = this;
        this._calendar.hasBorder = false;
        setTimeout(function () {
            _that._calendar.reload();
        }, 3000);
        //this._calendar.ios().setTitleDefaultColor(new Color("white").ios);
    }

    public changeDisplayMode() {
        let newDisplayMode: DISPLAY_MODE;
        this.displayMode = this.displayMode === DISPLAY_MODE.MONTH ? DISPLAY_MODE.WEEK : DISPLAY_MODE.MONTH;
        this._calendar.displayMode = this.displayMode;
    }

    public changeOrientation() {
        let newOrientation: SCROLL_ORIENTATION;
        this.scrollOrientation = this.scrollOrientation === SCROLL_ORIENTATION.HORIZONTAL ? SCROLL_ORIENTATION.VERTICAL : SCROLL_ORIENTATION.HORIZONTAL;
        this._calendar.scrollOrientation = this.scrollOrientation;
    }


    public dateSelected(event) {
        console.dir(event.data.date);
    }

    public monthChanged(event) {
        console.dir(event.data);
    }
}

