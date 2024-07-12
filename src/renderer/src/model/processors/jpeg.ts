import { AbstractImageProcessor, ConvertToType } from '../../interfaces/image-processor.abstract'

class JpegImageProcessor extends AbstractImageProcessor {
  async process(file: File, imageUrl: string): Promise<any> {
    this.convertImageTo(ConvertToType.jpg, imageUrl)
      .then((convertResponse) => {
        const path = this.getPath(file, ConvertToType.jpg)
        this.saveFile(path, convertResponse.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

export default JpegImageProcessor
