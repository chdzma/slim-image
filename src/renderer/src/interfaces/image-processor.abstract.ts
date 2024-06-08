export abstract class AbstractImageProcessor {
  abstract process(file: File): Promise<any>

  protected async readFile(
    file: File
  ): Promise<{ arrayBuffer: ArrayBuffer; fileNameWithoutExtension: string; filePath: string }> {
    const fileNameWithoutExtension = file.name.substring(0, file.name.lastIndexOf('.'))
    const arrayBuffer = await file.arrayBuffer()
    const lastSlashIndex = file.path.lastIndexOf('/')
    const directory = file.path.substring(0, lastSlashIndex + 1)
    return { arrayBuffer, fileNameWithoutExtension, filePath: directory }
  }
}
