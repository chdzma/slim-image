import { AbstractImageProcessor } from '../../interfaces/image-processor.abstract'

class PngImageProcessor extends AbstractImageProcessor {
  async process(file: File): Promise<any> {
    const { arrayBuffer, fileNameWithoutExtension, filePath } = await this.readFile(file)
    const outputFileName = `${filePath}${fileNameWithoutExtension}.png`

    try {
      const result = await window.electron.ipcRenderer.invoke('convert-image', {
        fileBuffer: arrayBuffer,
        format: 'png',
        outputFileName: outputFileName
      })

      return result
    } catch (error) {
      console.error('Error processing image to JPEG:', error)
      throw error
    }
  }
}

export default PngImageProcessor
