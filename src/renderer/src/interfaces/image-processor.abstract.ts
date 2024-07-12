export enum ConvertToType {
  webp = 'webp',
  png = 'png',
  jpg = 'jpg'
}

export abstract class AbstractImageProcessor {
  private apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  abstract process(file: File, imageUrl: string): Promise<any>

  protected getPath(file: File, type: ConvertToType): string {
    const originalFilePath = file.path
    const lastSlashIndex = originalFilePath.lastIndexOf('/')
    const originalDirectory = originalFilePath.slice(0, lastSlashIndex)
    const fileNameWithoutExtension = file.name.substring(0, file.name.lastIndexOf('.'))
    return `${originalDirectory}/${fileNameWithoutExtension}.${type}`
  }

  protected saveFile(filePath: string, data: ArrayBuffer): Promise<void> {
    return window.electron.ipcRenderer.invoke('save-file', { filePath, data })
  }

  protected convertImageTo(type: ConvertToType, compressedUrl: string): Promise<any> {
    return window.electron.ipcRenderer.invoke('request', {
      method: 'POST',
      url: compressedUrl,
      headers: {
        Authorization: `Basic ${btoa(`api:${this.apiKey}`)}`,
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        convert: { type: `image/${type}` }
      }),
      responseType: 'arraybuffer'
    })
  }
}
