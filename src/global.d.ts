import { CSSProp } from "styled-components" // eslint-disable-line @typescript-eslint/no-unused-vars

declare global {
  // raw-loader
  declare module '*.txt'
  namespace JSX {
    interface IntrinsicAttributes {
      css?: CSSProp
    }
  }
}