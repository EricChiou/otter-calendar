export default class Routes {
  public static readonly PRE_PATH = import.meta.env.PROD ? '/otter-calendar' : '';

  public static readonly LOGIN = `${this.PRE_PATH}/login`;
  public static readonly CALENDAR = `${this.PRE_PATH}/calendar`;
  public static readonly EVENT_RECORDS = `${this.PRE_PATH}/event-records`;
  public static readonly TRIP_NOTE = `${this.PRE_PATH}/trip-note`;
  public static readonly TRIP_NOTE_DETAIL_$ID = `${this.PRE_PATH}/trip-note/:id`;
  public static readonly SETTING = `${this.PRE_PATH}/setting`;
}
