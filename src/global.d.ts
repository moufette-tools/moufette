import { CSSProp } from "styled-components" // eslint-disable-line @typescript-eslint/no-unused-vars

declare global {
  namespace JSX {
    interface IntrinsicAttributes {
      css?: CSSProp
    }
  }
}