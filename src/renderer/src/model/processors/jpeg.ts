import { AbstractImageProcessor, ConvertToType } from '../../interfaces/image-processor.abstract'

class JpegImageProcessor extends AbstractImageProcessor {
  async process(file: File, imageUrl: string): Promise<any> {
    const convertResponse = await this.convertImageTo(ConvertToType.jpg, imageUrl)
    const path = this.getPath(file, ConvertToType.jpg)
    await this.saveFile(path, convertResponse.data)
  }
}

export default JpegImageProcessor
