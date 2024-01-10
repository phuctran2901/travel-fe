export const PATH = Object.freeze({
  TOUR: '/tour',
  SEARCH_TOUR: '/search-tour'
})

export const MENU_NAVIGATION = [
  {
    title: 'Du lịch',
    to: '/search-tour'
  },
  {
    title: 'Tin tức',
    children: [],
    to: '/news-travel'
  },
  {
    title: 'Thiết kế tour',
    children: [],
    to: '/design-tour'
  },
  {
    title: 'Liên hệ',
    children: [],
    to: '/lien-he'
  }
]

export enum InputType {
  TEXT = 'text',
  SELECT = 'select',
  DATE_PICKER = 'datePicker',
  NUMBER = 'number'
}

export enum BlogTabsKey {
  DEFAULT = 'default',
  TRAVEL_NEWS = 'travel_news',
  TRAVEL_GUIDE = 'travel_guide',
  TRAVEL_EXPERIENCE = 'travel_experience'
}

export const DATE_FORMAT = Object.freeze({
  dateDDMMYYYY: 'DDMMYYYY',
  dateDDMMYYYYhhmm: 'DDMMYYYYHHmm'
})

export const TOUR_CATE = Object.freeze({
  SALE: 'Sale',
  NEWS: 'News',
  POPULAR: 'Popular',
  EXPLORE: 'Explore'
})

export const TYPE_POST = Object.freeze({
  NEWS: 'tintuc',
  TIPS: 'camnang',
  EXPERIENCE: 'kinhnghiem'
})
