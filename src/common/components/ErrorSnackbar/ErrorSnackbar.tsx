import { SyntheticEvent } from 'react'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { selectAppError, setAppErrorAC } from "@/app/app-slice.ts"

export const ErrorSnackbar = () => {
  //const [open, setOpen] = useState(true)
  const dispatch = useAppDispatch()
  const error = useAppSelector(selectAppError)

  const handleClose = (_event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {  // чтобы нотификашка не закрывалась при клике вне поля
      return
    }
    dispatch(setAppErrorAC({error: null}))
  }

  return (
    <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%' }}>
        {error}
      </Alert>
    </Snackbar>
  )
}