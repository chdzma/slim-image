import { AbstractImageProcessor, ConvertToType } from '../../interfaces/image-processor.abstract'

class WebpImageProcessor extends AbstractImageProcessor {
  async process(file: File, imageUrl: string): Promise<any> {
    const convertResponse = await this.convertImageTo(ConvertToType.webp, imageUrl)
    const path = this.getPath(file, ConvertToType.webp)
    await this.saveFile(path, convertResponse.data)
  }
}

export default WebpImageProcessor
