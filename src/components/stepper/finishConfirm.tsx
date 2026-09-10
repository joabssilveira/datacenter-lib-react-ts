import { Button, Typography } from "@mui/material"
import React from "react"
import { useNavigate } from "react-router-dom"
import { DetailsStatus } from "../../types"
import { NewWizardController } from "../../types/controller"

export const StepperFinishConfirmComponent = <T,>(args: {
  controller: NewWizardController<T>,
  dataView: React.ReactNode,
  gotoOptions: {
    label: string,
    route: string,
  }
  resetOptions: {
    label: string,
  }
}) => {
  const { controller, dataView, gotoOptions, resetOptions, } = args

  if (!controller.wizardFinished) return null

  const navigate = useNavigate()
  return <>
    {controller.wizardFinished && (
      <>
        {(controller.status == DetailsStatus.undefined) ? <>
          <Typography>Confirme os dados que você informou</Typography>
          {/* <Typography>Grupo de trabalho: {controller.data?.name ?? 'não informado'}</Typography> */}
          {dataView}
          <Button variant='contained' onClick={controller.save} sx={{ mt: 1, mr: 1 }}>
            Enviar
          </Button>
          <Button variant="outlined" onClick={controller.reset} sx={{ mt: 1, mr: 1 }}>
            Refazer
          </Button>
        </>
          :
          (controller.status == DetailsStatus.saving) ? <>
            <Typography>Enviando seus dados...</Typography>
          </> : (controller.status == DetailsStatus.success) ? <>
            <Typography>Alterações salvas com sucesso.</Typography>
            <Button variant='contained' onClick={() => {
              controller.reset()
              controller.setData(controller.getInitData())
            }} sx={{ mt: 1, mr: 1 }}>
              {resetOptions.label}
            </Button>
            <Button variant='outlined' onClick={() => navigate(gotoOptions.route)} sx={{ mt: 1, mr: 1 }}>
              {gotoOptions.label}
            </Button>
          </> : (controller.status == DetailsStatus.error) ? <>
            <Typography>Erro ao enviar os dados</Typography>
            <Button variant='contained' onClick={controller.save} sx={{ mt: 1, mr: 1 }}>
              Enviar novamente
            </Button><Button variant="outlined" onClick={controller.reset} sx={{ mt: 1, mr: 1 }}>
              Refazer
            </Button>
          </> : <></>
        }
      </>
    )}
  </>
}