import { IconButton } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import React, { ReactNode } from "react";
import { FaTrash } from "react-icons/fa";
import { IoIosAdd, IoIosCheckmark, IoIosClose, IoIosRefresh } from "react-icons/io";
import styles from './style.module.scss';
import { FlexGrowComponent } from "../common/flexGrow";

export interface IHeaderComponentActions {
  icon: React.ReactNode,
  action: () => void,
  toolTip?: String,
  show?: Boolean
}

export interface IHeaderComponentProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  rightContent?: ReactNode,
  onAddClick?: () => void,
  onRefreshClick?: () => void,
  onConfirmClick?: () => void,
  onRemoveClick?: () => void,
  onCancelClick?: () => void,
  customActions?: IHeaderComponentActions[],
  toolTipAdd?: ReactNode,
  toolTipRefresh?: ReactNode,
  toolTipConfirm?: ReactNode,
  toolTipRemove?: ReactNode,
  toolTipCancel?: ReactNode
}

export const HeaderComponent: React.FC<IHeaderComponentProps> = ({
  rightContent,
  onAddClick,
  onRefreshClick,
  onConfirmClick,
  onRemoveClick,
  onCancelClick,
  customActions,
  toolTipAdd,
  toolTipRefresh,
  toolTipConfirm,
  toolTipRemove,
  toolTipCancel,
  title,
  ...props
}) => {
  return <div id={props.id ?? 'HeaderComponent'} {...props} className={`${styles.root} ${props.className}`} >
    <h3>{title}</h3>
    <FlexGrowComponent />

    {rightContent}

    <div>
      {customActions?.map((i, idx) =>
        i.show ? <Tooltip key={idx} title={i.toolTip} >
          <IconButton onClick={i.action} style={{ height: 46, width: 46 }}>
            {i.icon}
          </IconButton>
        </Tooltip> : <React.Fragment key={idx}></React.Fragment>
      )}

      {onRefreshClick ? <Tooltip title={toolTipRefresh}>
        <IconButton onClick={onRefreshClick} style={{ height: 46, width: 46 }}>
          <IoIosRefresh size={25} />
        </IconButton>
      </Tooltip> : <></>}

      {onAddClick ? <Tooltip title={toolTipAdd}>
        <IconButton onClick={onAddClick}>
          <IoIosAdd size={30} />
        </IconButton>
      </Tooltip> : <></>}

      {onConfirmClick ? <Tooltip title={toolTipConfirm}>
        <IconButton onClick={onConfirmClick}>
          <IoIosCheckmark size={30} />
        </IconButton>
      </Tooltip> : <></>}

      {onRemoveClick ? <Tooltip title={toolTipRemove}>
        <IconButton onClick={onRemoveClick} style={{ height: 46, width: 46 }}>
          <FaTrash size={15} />
        </IconButton>
      </Tooltip> : <></>}

      {onCancelClick ? <Tooltip title={toolTipCancel}>
        <IconButton onClick={onCancelClick}>
          <IoIosClose size={30} />
        </IconButton>
      </Tooltip> : <></>}
    </div>
  </div>
}