export enum FileProcessStatus {
  pending = 'pending',
  processed = 'pocessed',
  processing = 'processing'
}

export interface FileProcess {
  file: File
  optimizedFile?: File
  status: FileProcessStatus
  optimizedSize?: number
}
