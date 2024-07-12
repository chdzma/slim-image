import { AbstractImageProcessor } from '../../interfaces/image-processor.abstract'

class ImageProcessor {
  private processors: AbstractImageProcessor[]

  constructor(processors: AbstractImageProcessor[]) {
    this.processors = processors
  }

  async run(file: File, imageUrl: string) {
    for (let index = 0; index < this.processors.length; index++) {
      const processor = this.processors[index]
      await processor.process(file, imageUrl)
    }
  }
}

export default ImageProcessor
