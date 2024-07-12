import { AbstractImageProcessor, ConvertToType } from '../../interfaces/image-processor.abstract'

class WebpImageProcessor extends AbstractImageProcessor {
  async process(file: File, imageUrl: string): Promise<any> {
    this.convertImageTo(ConvertToType.webp, imageUrl)
      .then((convertResponse) => {
        const path = this.getPath(file, ConvertToType.webp)
        this.saveFile(path, convertResponse.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

export default WebpImageProcessor
