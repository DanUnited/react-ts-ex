export enum EventTypesEnum {
  CLOSED = 'CLOSED',
  TOURNAMENT = 'TOURNAMENT',
  GREENS_AERIFICATION = 'GREENS_AERIFICATION',
  OVERSEEDING_GREENS = 'OVERSEEDING_GREENS',
  FULL_DAY_TOURNAMENT = 'FULL_DAY_TOURNAMENT',
  CART_PATH = 'CART_PATH',
  HOLIDAY = 'HOLIDAY',
  BLOCK_TRADE_ROUNDS = 'BLOCK_TRADE_ROUNDS',
  OVERRIDE_NATIONAL_HOLIDAY = 'OVERRIDE_NATIONAL_HOLIDAY',
  NATIONAL_HOLIDAY = 'NATIONAL_HOLIDAY',
  CUSTOM = 'CUSTOM',
}

export enum CourseSettingsTabsEnum {
  CALENDAR = 'calendar',
  MEMBERSHIP = 'memberships',
  SEASONS = 'seasons',
  SETTINGS = 'course',
  TAXES = 'taxes',
  TIME_PERIODS = 'time-periods',
}

export const editableEvents = [
  EventTypesEnum.CLOSED,
  EventTypesEnum.TOURNAMENT,
  EventTypesEnum.GREENS_AERIFICATION,
  EventTypesEnum.OVERSEEDING_GREENS,
  EventTypesEnum.FULL_DAY_TOURNAMENT,
  EventTypesEnum.CUSTOM,
];

export const nonEditableEvents = [
  EventTypesEnum.CART_PATH,
  EventTypesEnum.HOLIDAY,
  EventTypesEnum.BLOCK_TRADE_ROUNDS,
  EventTypesEnum.OVERRIDE_NATIONAL_HOLIDAY,
  EventTypesEnum.NATIONAL_HOLIDAY,
];

export const getCalendarEventName = (event: EventTypesEnum): string => {
  switch (event) {
    case EventTypesEnum.CLOSED:
      return 'Course closed';
    case EventTypesEnum.BLOCK_TRADE_ROUNDS:
      return 'Block trade rounds';
    case EventTypesEnum.CART_PATH:
      return 'Cart path';
    case EventTypesEnum.HOLIDAY:
      return 'Holiday';
    case EventTypesEnum.TOURNAMENT:
      return 'Tournament';
    case EventTypesEnum.OVERRIDE_NATIONAL_HOLIDAY:
      return 'Override national holiday';
    case EventTypesEnum.FULL_DAY_TOURNAMENT:
      return 'Full day tournament';
    case EventTypesEnum.OVERSEEDING_GREENS:
      return 'Overseeding greens';
    case EventTypesEnum.GREENS_AERIFICATION:
      return 'Greens aerification';
    case EventTypesEnum.NATIONAL_HOLIDAY:
      return 'National holiday';
    case EventTypesEnum.CUSTOM:
      return 'Custom Event';
  }
};
