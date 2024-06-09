export enum FileProcessStatus {
  pending = 'pending',
  processed = 'pocessed',
  processing = 'processing'
}

export interface FileProcess {
  id: string;
  file: File
  optimizedFile?: File
  status: FileProcessStatus
  optimizedSize?: number
}
