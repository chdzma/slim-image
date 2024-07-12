import { useState, useEffect } from 'react'
import { Chip, Divider, Grid, Link, Stack } from '@mui/material'
import { useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { RootState } from '../store/reducers'
import { Layout } from '../layout/Layout'
import UploadFileContainer from '../components/UploadFileContainer'
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
  const compressions = useSelector((state: RootState) => state.imgService.compressions)
  const [selectedFiles, setSelectedFiles] = useState<FileProcess[]>([])
  const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false)
  const [showSettings, setShowSettings] = useState<boolean>(false)

  const handleFilesUploaded = (files: File[]) => {
    setSelectedFiles((prevFiles) => [
      ...files.map((file) => ({
        id: uuidv4(),
        file: file,
        status: FileProcessStatus.pending
      })),
      ...prevFiles
    ])
  }

  const optimize = () => {
    if (!config.tinypngKey) {
      setSnackbarVisible(true)
    }

    const processors: AbstractImageProcessor[] = []
    if (config.convertToJpg) {
      processors.push(new JpegImageProcessor(config.tinypngKey))
    }

    if (config.convertToPng) {
      processors.push(new PngImageProcessor(config.tinypngKey))
    }

    if (config.convertToWebp) {
      processors.push(new WebpImageProcessor(config.tinypngKey))
    }

    const imageProcessor = new ImageProcessor(processors)
    const imageOptimizer = new ImageOptimizer(config.tinypngKey, config.replaceImage)

    const processFile = (file: FileProcess) => {
      setSelectedFiles((prevFiles) =>
        prevFiles.map((f) =>
          f.id === file.id ? { ...f, status: FileProcessStatus.processing } : f
        )
      )

      imageOptimizer.optimizeImage(
        file.file,
        async (optimizedFile: File, size: number, imageUrl: string) => {
          await imageProcessor.run(optimizedFile, imageUrl)
          setSelectedFiles((prevFiles) =>
            prevFiles.map((f) =>
              f.id === file.id
                ? {
                    ...f,
                    status: FileProcessStatus.processed,
                    optimizedSize: size,
                    optimizedFile: optimizedFile
                  }
                : f
            )
          )
        },
        () => {
          setSelectedFiles((prevFiles) =>
            prevFiles.map((f) =>
              f.id === file.id
                ? {
                    ...f,
                    status: FileProcessStatus.error
                  }
                : f
            )
          )
        }
      )
    }

    selectedFiles
      .filter((file) => file.status === FileProcessStatus.pending)
      .forEach((file) => processFile(file))
  }

  useEffect(() => {
    if (selectedFiles.length > 0) {
      optimize()
    }
  }, [selectedFiles.length])

  return (
    <Layout>
      <Stack direction={'row'} mb={3} justifyContent={'space-between'}>
        <Chip label={`Compressions this month: ${compressions} images`} component="a" />

        <Link
          component={'button'}
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
            <UploadFileContainer handleFilesUploaded={handleFilesUploaded} />
            <Stack divider={<Divider orientation="horizontal" flexItem />}>
              {selectedFiles.map((file) => (
                <ImageCard key={file.id} file={file} />
              ))}
            </Stack>
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
