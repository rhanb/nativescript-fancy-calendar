export class CalendarEvent {
    private _date: Date;
    private _source: string;

    constructor(eventDate: Date, eventSource?: string) {
        this._date = eventDate;
        if (eventSource) {
            this._source = eventSource;
        }
    }

    public get date(): Date {
        return this._date;
    }

    public set date(eventDate: Date) {
        this._date = eventDate;
    }
    public get source(): string {
        return this._source;
    }

    public set source(eventSource: string) {
        this._source = eventSource;
    }
}