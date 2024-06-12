import { ChangeEvent, DragEvent, useState } from 'react'
import { styled } from '@mui/material/styles'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { Button, Box, Typography } from '@mui/material'

interface UploadFileContainerProps {
  handleFilesUploaded: (file: File[]) => void
}

export default function UploadFileContainer({ handleFilesUploaded }: UploadFileContainerProps) {
  const [isDragging, setIsDragging] = useState(false)

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1
  })

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const filesArray = Array.from(event.target.files)
      handleFilesUploaded(filesArray)
    }
  }

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const filesArray = Array.from(event.dataTransfer.files)
      handleFilesUploaded(filesArray)
      event.dataTransfer.clearData()
    }
  }

  return (
    <Box
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      sx={{
        border: isDragging ? '2px dashed #5BE0E5' : '2px dashed #aaa',
        padding: '20px',
        borderRadius: '5px',
        textAlign: 'center',
        cursor: 'pointer',
        bgcolor: isDragging ? '#001718' : 'inherit'
      }}
    >
      <Button
        id="uploadFileBtn"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Upload file
        <VisuallyHiddenInput onChange={handleFileSelect} type="file" multiple />
      </Button>
      <Typography variant="body1" mt={2}>
        or drag and drop files here
      </Typography>
    </Box>
  )
}
