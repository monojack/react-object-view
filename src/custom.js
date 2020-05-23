/** WiP */
import {
  customValue as Symbol_customValue,
  customPreview as Symbol_customPreview,
} from './symbols'

export function customValue(render = () => null) {
  return {
    [Symbol_customValue]() {
      return render?.()
    },
  }
}

export function customPreview(render = () => null) {
  return {
    [Symbol_customPreview]() {
      return render?.()
    },
  }
}
