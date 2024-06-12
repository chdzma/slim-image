import('wdio-electron-service')
import { browser, expect } from '@wdio/globals'

describe('Default app test', () => {
  it('should open the main window and check the title', async () => {
    browser.pause(3000)

    const title = await browser.getTitle()

    expect(title).toBe('Slim Image')
  })

  it('should interact with an upload file button', async () => {
    const classNameAndText = await $('#uploadFileBtn')
    await expect(classNameAndText).toHaveText('UPLOAD FILE')
  })
})
