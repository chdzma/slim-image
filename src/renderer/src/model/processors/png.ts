import { AbstractImageProcessor, ConvertToType } from '../../interfaces/image-processor.abstract'

class PngImageProcessor extends AbstractImageProcessor {
  async process(file: File, imageUrl: string): Promise<any> {
    const convertResponse = await this.convertImageTo(ConvertToType.png, imageUrl)
    const path = this.getPath(file, ConvertToType.png)
    await this.saveFile(path, convertResponse.data)
  }
}

export default PngImageProcessor
