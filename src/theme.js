import { atom } from 'recoil'

export const defaultPalette = {
  // Spectrum
  base00: '#222222',
  base01: '#373637',
  base02: '#4c4a4d',
  base03: '#615e63',
  base04: '#767279',
  base05: '#8B878F',
  base06: '#fafafa',
  base07: '#ffffff',
  base08: '#ff6188',
  base09: '#ab9df2',
  base0A: '#78dce8',
  base0B: '#ffd866',
  base0C: '#78dce8',
  base0D: '#a9dc76',
  base0E: '#ff6188',
  base0F: '#fc9867',
}

function buildStyles({
  base00 = defaultPalette.base00, // Default Background
  base01 = defaultPalette.base01, // Lighter Background (Used for status bars)
  base02 = defaultPalette.base02, // Selection Background
  base03 = defaultPalette.base03, // Comments, Invisibles, Line Highlighting
  base04 = defaultPalette.base04, // Dark Foreground (Used for status bars)
  base05 = defaultPalette.base05, // Default Foreground, Caret, Delimiters, Operators
  base06 = defaultPalette.base06, // Light Foreground (Not often used)
  base07 = defaultPalette.base07, // Light Background (Not often used)
  base08 = defaultPalette.base08, // Variables, XML Tags, Markup Link Text, Markup Lists, Diff Deleted
  base09 = defaultPalette.base09, // Integers, Boolean, Constants, XML Attributes, Markup Link Url
  base0A = defaultPalette.base0A, // Classes, Markup Bold, Search Text Background
  base0B = defaultPalette.base0B, // Strings, Inherited Class, Markup Code, Diff Inserted
  base0C = defaultPalette.base0C, // Support, Regular Expressions, Escape Characters, Markup Quotes
  base0D = defaultPalette.base0D, // Functions, Methods, Attribute IDs, Headings
  base0E = defaultPalette.base0E, // Keywords, Storage, Selector, Markup Italic, Diff Changed
  base0F = defaultPalette.base0F, // Deprecated, Opening/Closing Embedded Language Tags, e.g.
} = defaultPalette) {
  return {
    fontFamily: 'Dank Mono, monospace',
    fontSize: 14,
    lineHeight: 1.6,
    tabWidth: 2,
    tabSize: 24,
    // ...
    backgroundColor: base00,
    color: base05,
    keyColor: base06,
    valueColor: base06,
    valueTypeColor: base0A,
    valueBracketsColor: base0F,
    valueStringColor: base0B,
    valueSymbolColor: base0B,
    valueNumberColor: base09,
    valueBooleanColor: base08,
    valueFunctionColor: base0D,
    valueFunctionArrowColor: base0E,
    valueRegExpColor: base0C,
    valueDateColor: base0F,
    valueURLColor: base0F,
    valueNullColor: base0D,
    valueNullBackgroundColor: base01,
    valueUndefinedColor: base06,
    valueUndefinedBackgroundColor: base01,
  }
}

export const defaultStyles = buildStyles(defaultPalette)

export function buildTheme({ palette, styles }) {
  return {
    ...buildStyles(palette),
    ...styles,
  }
}

export const defaultTheme = buildTheme({
  palette: defaultPalette,
  styles: defaultStyles,
})

export const themeState = atom({
  key: 'ROVThemeState',
  default: defaultTheme,
})
