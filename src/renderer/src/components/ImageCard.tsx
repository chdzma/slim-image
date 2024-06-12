import { useMemo } from 'react'
import { Typography, Stack, CircularProgress } from '@mui/material'
import { FileProcess, FileProcessStatus } from '../interfaces/file-process.interface'
import { formatBytes } from '../helper/global'
import PendingRoundedIcon from '@mui/icons-material/PendingRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import ErrorIcon from '@mui/icons-material/Error'

interface ImageCardProps {
  file: FileProcess
}

export default function ImageCard({ file }: ImageCardProps) {
  const imageSrc = useMemo(() => {
    if (file.status === FileProcessStatus.processed && file.optimizedFile) {
      return URL.createObjectURL(file.optimizedFile)
    }
    return URL.createObjectURL(file.file)
  }, [file])

  return (
    <div>
      <Stack
        alignItems="center"
        justifyContent="space-between"
        direction="row"
        spacing={1}
        mt={2}
        mb={2}
        mr={2}
        ml={2}
      >
        <Stack spacing={3} direction="row">
          <img width={55} src={imageSrc} alt={file.file.name} />
          <Stack>
            <Typography variant="body2">{file.file.path}</Typography>
            <Typography variant="body2">
              {formatBytes(file.file.size)}{' '}
              {file.optimizedSize && `"-${formatBytes(file.file.size - file.optimizedSize)}"`}
            </Typography>
          </Stack>
        </Stack>

        <div>
          {file.status === FileProcessStatus.pending && <PendingRoundedIcon />}
          {file.status === FileProcessStatus.processing && <CircularProgress />}
          {file.status === FileProcessStatus.processed && (
            <CheckCircleRoundedIcon color="success" />
          )}
          {file.status === FileProcessStatus.error && <ErrorIcon color="error" />}
        </div>
      </Stack>
    </div>
  )
}
