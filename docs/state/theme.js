import { atom } from 'recoil'

export const themeState = atom({
  key: 'demoThemeState',
  default: {
    palette: {},
    styles: {},
  },
})
