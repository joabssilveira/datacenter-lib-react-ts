import { Grid, GridProps } from "@mui/material"
import { FloatActionButtonComponent, IFloatActionButtonComponentProps } from "fwork-react-mui-ext"
import React, { ReactNode } from "react"
import { HeaderComponent, IHeaderComponentProps } from "../header"
import styles from './style.module.scss'
import { StrictOmit } from "fwork-jsts-common"

export interface DetailsGridComponentItem {
  hide?: boolean,
  itemProps?: GridProps | undefined,
  child: ReactNode
}

export interface DetailsGridComponentProps extends GridProps {
  itemProps?: GridProps,
  items: DetailsGridComponentItem[],
}

const asSizeObject = (size: GridProps['size'] | undefined) => {
  if (!size || typeof size !== 'object' || Array.isArray(size)) {
    return {};
  }
  return size;
};

export const DetailsGridComponent: React.FC<DetailsGridComponentProps> = ({ items, itemProps, ...props }) => {
  return <Grid {...props} id={props.id ?? 'DetailsGridComponent'} container={props.container ?? true} spacing={props.spacing ?? 2}>
    {items.filter(item => !item.hide).map((item, idx) => {
      const baseSize = {
        xs: asSizeObject(itemProps?.size).xs ?? asSizeObject(item.itemProps?.size).xs ?? 12,

        sm: asSizeObject(itemProps?.size).xs ?? asSizeObject(item.itemProps?.size).xs
          ?? asSizeObject(itemProps?.size).sm ?? asSizeObject(item.itemProps?.size).sm ?? 12,

        md: asSizeObject(itemProps?.size).xs ?? asSizeObject(item.itemProps?.size).xs
          ?? asSizeObject(itemProps?.size).sm ?? asSizeObject(item.itemProps?.size).sm
          ?? asSizeObject(itemProps?.size).md ?? asSizeObject(item.itemProps?.size).md ?? 4,

        lg: asSizeObject(itemProps?.size).xs ?? asSizeObject(item.itemProps?.size).xs
          ?? asSizeObject(itemProps?.size).sm ?? asSizeObject(item.itemProps?.size).sm
          ?? asSizeObject(itemProps?.size).md ?? asSizeObject(item.itemProps?.size).md
          ?? asSizeObject(itemProps?.size).lg ?? asSizeObject(item.itemProps?.size).lg ?? 4,

        xl: asSizeObject(itemProps?.size).xs ?? asSizeObject(item.itemProps?.size).xs
          ?? asSizeObject(itemProps?.size).sm ?? asSizeObject(item.itemProps?.size).sm
          ?? asSizeObject(itemProps?.size).md ?? asSizeObject(item.itemProps?.size).md
          ?? asSizeObject(itemProps?.size).lg ?? asSizeObject(item.itemProps?.size).lg
          ?? asSizeObject(itemProps?.size).xl ?? asSizeObject(item.itemProps?.size).xl ?? 3,
      };

      return <Grid {...itemProps} {...item.itemProps}
        key={idx}

        size={{
          ...baseSize,
          ...asSizeObject(itemProps?.size),
          ...asSizeObject(item.itemProps?.size),
        }}
      >
        {item.child}
      </Grid>
    })}
  </Grid>
}

export interface IDetailsComponentProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: ReactNode,
  footer?: ReactNode,
  headerProps?: IHeaderComponentProps,
  contentProps?: React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>,
  floatBtnProps?: StrictOmit<IFloatActionButtonComponentProps, 'ariaLabel'> & {
    ariaLabel?: string | undefined,
    hide?: boolean | undefined
  },
}

export const DetailsComponent: React.FC<IDetailsComponentProps> = ({ children, footer, headerProps, contentProps, floatBtnProps, ...props }) => {
  const { hide: floatBtnPropsHide, ...floatBtnPropsRest } = floatBtnProps ?? {}

  return <div {...props} id={props.id ?? 'DetailsComponent'} className={styles.root}>
    <HeaderComponent
      {...headerProps} className={`${headerProps?.className}`}
    />

    <form {...contentProps} style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
    }}>
      {children}
    </form>

    {footer}

    {floatBtnPropsHide != true && <>
      <FloatActionButtonComponent {...floatBtnPropsRest}
        ariaLabel={floatBtnProps?.ariaLabel ?? "Opções"}
        confirmProps={floatBtnProps?.confirmProps ? {
          ...floatBtnProps?.confirmProps,
          toolTip: {
            ...floatBtnProps?.confirmProps?.toolTip,
            title: floatBtnProps?.confirmProps?.toolTip?.title ?? 'Salvar Alterações'
          }
        } : undefined}
        addProps={floatBtnProps?.addProps ? {
          ...floatBtnProps?.addProps,
          toolTip: {
            ...floatBtnProps?.addProps?.toolTip,
            title: floatBtnProps?.addProps?.toolTip?.title ?? 'Novo Registro'
          }
        } : undefined}
      />
      <div style={{ width: '100%', height: 70 }}></div>
    </>}

  </div>
}