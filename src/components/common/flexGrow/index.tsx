import React from "react"
import { stylesModule } from "./index.styles"

export const FlexGrowComponent = (props: {
  children?: React.ReactNode,
  props?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
}) => {
  const styles = stylesModule()

  return <div className="FlexGrowComponent" style={{
    ...styles.root,
    ...props.props?.style
  }}>
    {props.children}
  </div>
}