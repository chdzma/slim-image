import store from '@renderer/store/store'
import { setData } from '../store/reducers/imgServiceSlice'

class ImageOptimizer {
  private apiKey: string
  private replaceImage: boolean
  private urlImage: string = ''

  constructor(apiKey: string, replaceImage = false) {
    this.apiKey = apiKey
    this.replaceImage = replaceImage
  }

  private readFileAsArrayBuffer(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsArrayBuffer(file)
      reader.onload = () => resolve(new Uint8Array(reader.result as ArrayBuffer))
      reader.onerror = reject
    })
  }

  private uploadImage(imageData: Uint8Array): Promise<any> {
    return window.electron.ipcRenderer.invoke('request', {
      method: 'POST',
      url: 'https://api.tinify.com/shrink',
      headers: {
        Authorization: `Basic ${btoa(`api:${this.apiKey}`)}`,
        'Content-Type': 'application/octet-stream'
      },
      data: imageData
    })
  }

  private downloadOptimizedImage(url: string): Promise<any> {
    return window.electron.ipcRenderer.invoke('request', {
      method: 'GET',
      url,
      headers: {
        Authorization: `Basic ${btoa(`api:${this.apiKey}`)}`,
        'Content-Type': 'application/octet-stream'
      },
      responseType: 'arraybuffer'
    })
  }

  private saveFile(filePath: string, data: ArrayBuffer): Promise<void> {
    return window.electron.ipcRenderer.invoke('save-file', { filePath, data })
  }

  private getOptimizedFilePath(file: File): string {
    const optimizedFileName = this.replaceImage ? file.name : `optimized-${file.name}`
    const originalFilePath = file.path
    const lastSlashIndex = originalFilePath.lastIndexOf('/')
    const originalDirectory = originalFilePath.slice(0, lastSlashIndex)
    return `${originalDirectory}/${optimizedFileName}`
  }

  public async optimizeImage(
    file: File,
    onFinish: (optimizedFile: File, size: number, imageUrl: string) => void,
    onError: () => void
  ): Promise<any> {
    try {
      const imageData = await this.readFileAsArrayBuffer(file)
      const uploadResponse = await this.uploadImage(imageData)
      console.log(uploadResponse)
      store.dispatch(setData({ compressions: uploadResponse.headers['compression-count'] }))
      if (uploadResponse.data.output && uploadResponse.data.output.url) {
        this.urlImage = uploadResponse.data.output.url
        const optimizedImageData = await this.downloadOptimizedImage(uploadResponse.data.output.url)
        const optimizedFilePath = this.getOptimizedFilePath(file)
        this.saveFile(optimizedFilePath, optimizedImageData.data)
        const blob = new Blob([optimizedImageData.data], { type: file.type })
        const optimizedFile = new File([blob], file.name, { lastModified: file.lastModified })
        Object.defineProperty(optimizedFile, 'path', {
          value: optimizedFilePath,
          writable: false,
          enumerable: false,
          configurable: false
        })
        onFinish(optimizedFile, blob.size, this.urlImage)
      } else {
        throw new Error('Failed to get optimized image URL')
      }
    } catch (error) {
      onError()
      console.error('Error:', error)
    }
  }
}

export default ImageOptimizer
