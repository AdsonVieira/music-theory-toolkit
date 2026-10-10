import { expect, test } from '@playwright/test'

test.describe('intervalos e tonalidade global', () => {
  test('mudar a origem em Intervalos não altera a tonalidade do Campo Harmônico', async ({ page }) => {
    await page.goto('/#/campo-harmonico')
    await page.locator('#tonalidade').selectOption('7')

    await page.goto('/#/intervalos')
    await page.locator('#nota-origem').selectOption('10')
    await expect(page.locator('#nota-origem')).toHaveValue('10')

    await page.goto('/#/campo-harmonico')
    await expect(page.locator('#tonalidade')).toHaveValue('7')

    const lastPitchClass = await page.evaluate(() => localStorage.getItem('mtt.lastPitchClass'))
    expect(lastPitchClass).toBe('7')
  })

  test('a tonalidade escolhida no Campo Harmônico persiste após recarregar', async ({ page }) => {
    await page.goto('/#/campo-harmonico')
    await page.locator('#tonalidade').selectOption('7')

    await page.reload()
    await expect(page.locator('#tonalidade')).toHaveValue('7')
  })
})
