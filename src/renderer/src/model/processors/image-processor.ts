import { AbstractImageProcessor } from '../../interfaces/image-processor.abstract'

class ImageProcessor {
  private processors: AbstractImageProcessor[]

  constructor(processors: AbstractImageProcessor[]) {
    this.processors = processors
  }

  async run(file: File) {
    for (let index = 0; index < this.processors.length; index++) {
      const processor = this.processors[index]
      await processor.process(file)
    }
  }
}

export default ImageProcessor
