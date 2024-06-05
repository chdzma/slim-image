
export interface Config {
  tinypngKey: string;
  replaceImage: boolean;
  convertToWebp: boolean;
  convertToPng: boolean;
  convertToJpg: boolean;
}

// Valores predeterminados de la configuración
export const defaultConfig: Config = {
  tinypngKey: '',
  replaceImage: false,
  convertToWebp: false,
  convertToPng: false,
  convertToJpg: false,
};