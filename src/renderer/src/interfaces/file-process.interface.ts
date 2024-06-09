export enum FileProcessStatus {
  pending = 'pending',
  processed = 'pocessed',
  processing = 'processing',
  error = 'error'
}

export interface FileProcess {
  id: string
  file: File
  optimizedFile?: File
  status: FileProcessStatus
  optimizedSize?: number
}
