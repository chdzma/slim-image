import { AbstractImageProcessor, ConvertToType } from '../../interfaces/image-processor.abstract'

class PngImageProcessor extends AbstractImageProcessor {
  async process(file: File, imageUrl: string): Promise<any> {
    this.convertImageTo(ConvertToType.png, imageUrl)
      .then((convertResponse) => {
        const path = this.getPath(file, ConvertToType.png)
        this.saveFile(path, convertResponse.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

export default PngImageProcessor
