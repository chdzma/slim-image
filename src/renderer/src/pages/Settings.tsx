import { useEffect } from 'react'
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  Switch,
  TextField,
  Typography
} from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Config } from '../helper/config'
import { RootState } from '../store/reducers'
import { setConfig } from '../store/reducers/configSlice'

export const Settings = () => {
  const dispatch = useDispatch()
  const config = useSelector((state: RootState) => state.config)

  const { register, handleSubmit, setValue } = useForm<Config>()

  useEffect(() => {
    setValue('tinypngKey', config.config.tinypngKey)
    setValue('replaceImage', config.config.replaceImage)
    setValue('convertToWebp', config.config.convertToWebp)
    setValue('convertToPng', config.config.convertToPng)
    setValue('convertToJpg', config.config.convertToJpg)
  }, [config, setValue])

  const onSubmit: SubmitHandler<Config> = (data) => {
    window.electron.ipcRenderer.send('set-config', data)
    dispatch(setConfig(data))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FormGroup>
          <TextField
            id="tinypngKey"
            label="TinyPNG API Key"
            variant="outlined"
            {...register('tinypngKey')}
          />

          <FormControlLabel
            control={<Checkbox defaultChecked={config.config.replaceImage} />}
            label="Replace image"
            {...register('replaceImage')}
          />
          <Typography>Convert to:</Typography>
          <FormControlLabel
            control={<Switch defaultChecked={config.config.convertToWebp} />}
            label="Webp"
            {...register('convertToWebp')}
          />
          <FormControlLabel
            control={<Switch defaultChecked={config.config.convertToPng} />}
            label="PNG"
            {...register('convertToPng')}
          />
          <FormControlLabel
            control={<Switch defaultChecked={config.config.convertToJpg} />}
            label="JPEG"
            {...register('convertToJpg')}
          />
        </FormGroup>
        <Button variant="contained" type="submit">
          Save
        </Button>
      </Stack>
    </form>
  )
}
