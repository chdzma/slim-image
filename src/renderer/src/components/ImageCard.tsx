import { Typography, Stack, CircularProgress } from '@mui/material'
import { FileProcess, FileProcessStatus } from '../interfaces/file-process.interface'
import { formatBytes } from '../helper/global'
import PendingRoundedIcon from '@mui/icons-material/PendingRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'

interface ImageCardProps {
  file: FileProcess
}

export default function ImageCard({ file }: ImageCardProps) {
  return (
    <div>
      <Stack
        alignItems="center"
        justifyContent="space-between"
        direction="row"
        spacing={1}
        mt={2}
        mb={2}
      >
        <Stack spacing={1} direction="row">
          <img
            width={50}
            height={50}
            src={URL.createObjectURL(
              file.status === FileProcessStatus.processed && file.optimizedFile
                ? file.optimizedFile
                : file.file
            )}
          />
          <Stack>
            <Typography variant="body2" className="text-white">
              {file.file.path}
            </Typography>
            <Typography variant="body2" className="text-white">
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
        </div>
      </Stack>
    </div>
  )
}
