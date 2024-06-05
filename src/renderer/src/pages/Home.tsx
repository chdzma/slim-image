import { useState, useEffect } from 'react'
import { Button, Divider, Grid, Link, Stack } from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '../store/reducers'
import { Layout } from '../layout/Layout'
import UploadFileButton from '../components/UploadFileButton'
import CustomSnackbar from '../components/Snackbar'
import ImageOptimizer from '../services/image-optimizer'
import { FileProcess, FileProcessStatus } from '../interfaces/file-process.interface'
import ImageCard from '../components/ImageCard'
import { Settings } from './Settings'
import SettingsIcon from '@mui/icons-material/Settings'
import { AbstractImageProcessor } from '../interfaces/image-processor.abstract'
import JpegImageProcessor from '../model/processors/jpeg'
import PngImageProcessor from '../model/processors/png'
import WebpImageProcessor from '../model/processors/webp'
import ImageProcessor from '../model/processors/image-processor'

export const Home = () => {
  const config = useSelector((state: RootState) => state.config.config)
  const [selectedFiles, setSelectedFiles] = useState<FileProcess[]>([])
  const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false)
  const [currentFileIndex, setCurrentFileIndex] = useState(0)
  const [showSettings, setShowSettings] = useState<boolean>(false)

  const handleFilesUploaded = (files: File[]) => {
    setSelectedFiles((prevFiles) => [
      ...prevFiles,
      ...files.map((file) => ({
        file: file,
        status: FileProcessStatus.pending
      }))
    ])
  }

  const optimize = () => {
    if (!config.tinypngKey) {
      setSnackbarVisible(true)
      return
    }

    const processors: AbstractImageProcessor[] = []
    if (config.convertToJpg) {
      processors.push(new JpegImageProcessor())
    }

    if (config.convertToPng) {
      processors.push(new PngImageProcessor())
    }

    if (config.convertToWebp) {
      processors.push(new WebpImageProcessor())
    }

    const imageProcessor = new ImageProcessor(processors)

    const imageOptimizer = new ImageOptimizer(config.tinypngKey, config.replaceImage)

    const processFile = (file: FileProcess, index: number) => {
      setSelectedFiles((prevFiles) => {
        const updatedFiles = [...prevFiles]
        updatedFiles[index].status = FileProcessStatus.processing
        return updatedFiles
      })
      imageOptimizer.optimizeImage(file.file, async (optimizedFile: File, size: number) => {
        await imageProcessor.run(optimizedFile)
        setSelectedFiles((prevFiles) => {
          const updatedFiles = [...prevFiles]
          updatedFiles[index].status = FileProcessStatus.processed
          updatedFiles[index].optimizedSize = size
          updatedFiles[index].optimizedFile = optimizedFile
          return updatedFiles
        })
        setCurrentFileIndex((prevIndex) => prevIndex + 1)
      })
    }

    if (currentFileIndex < selectedFiles.length) {
      processFile(selectedFiles[currentFileIndex], currentFileIndex)
    }
  }

  useEffect(() => {
    if (currentFileIndex < selectedFiles.length) {
      optimize()
    }
  }, [currentFileIndex])

  return (
    <Layout>
      <Stack direction={'row'} mb={3} justifyContent={'flex-end'}>
        <Link
          component={'button'}
          variant="body2"
          onClick={() => {
            setShowSettings(!showSettings)
          }}
        >
          <SettingsIcon />
        </Link>
      </Stack>

      <Grid container direction={'row'} spacing={6}>
        <Grid item xs={showSettings ? 8 : 12}>
          <Stack spacing={4}>
            <UploadFileButton handleFilesUploaded={handleFilesUploaded} />
            <Stack divider={<Divider orientation="horizontal" flexItem />}>
              {selectedFiles.map((file, index) => (
                <ImageCard key={index} file={file} />
              ))}
            </Stack>
            <Button disabled={!selectedFiles.length} variant="contained" onClick={optimize}>
              Optimize
            </Button>
          </Stack>
        </Grid>
        {showSettings && (
          <Grid item xs={4}>
            <Settings />
          </Grid>
        )}
      </Grid>
      <CustomSnackbar visible={snackbarVisible} message="API KEY not found" />
    </Layout>
  )
}
