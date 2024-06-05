import * as fs from 'fs'
import * as path from 'path'
import { app } from 'electron'

export interface Config {
  tinypngKey: string
  replaceImage: boolean
  convertToWebp: boolean
  convertToPng: boolean
  convertToJpg: boolean
}

const userDataPath = app.getPath('userData')
const configPath = path.join(userDataPath, 'config.json')

// Valores predeterminados de la configuración
export const defaultConfig: Config = {
  tinypngKey: '',
  replaceImage: false,
  convertToWebp: false,
  convertToPng: false,
  convertToJpg: false
}

// Leer la configuración desde el archivo JSON
export function readConfig(): Config {
  try {
    if (fs.existsSync(configPath)) {
      const rawData = fs.readFileSync(configPath, 'utf-8')
      return JSON.parse(rawData)
    } else {
      return defaultConfig
    }
  } catch (error) {
    console.error('Error reading config file:', error)
    return defaultConfig
  }
}

// Guardar la configuración en el archivo JSON
export function saveConfig(config: Config): void {
  try {
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8')
  } catch (error) {
    console.error('Error writing config file:', error)
  }
}
