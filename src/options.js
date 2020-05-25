import { atom } from 'recoil'

export const defaultOptions = {
  expandLevel: 0,
  previewPropertiesMaxCount: 5,
  displayPropertiesMaxCount: 0,
  previewElementsMaxCount: 5,
  previewStringMaxLength: 10,
  previewOpacity: 1,
  hidePreviews: false,
  hideDataTypes: false,
  hideObjectSize: false,
}

export const optionsState = atom({
  key: 'ROVOptionsState',
  default: defaultOptions,
})
