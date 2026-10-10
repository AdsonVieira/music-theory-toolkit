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

  test('mudar o destino em Intervalos não altera a fundamental em Acordes', async ({ page }) => {
    await page.goto('/#/campo-harmonico')
    await page.locator('#tonalidade').selectOption('7')

    await page.goto('/#/intervalos')
    await page.locator('#nota-destino').selectOption('2')
    await expect(page.locator('#nota-destino')).toHaveValue('2')

    await page.goto('/#/acordes')
    await expect(page.locator('#fundamental-acorde')).toHaveValue('7')

    const lastPitchClass = await page.evaluate(() => localStorage.getItem('mtt.lastPitchClass'))
    expect(lastPitchClass).toBe('7')
  })

  test('a tonalidade escolhida no Campo Harmônico persiste após recarregar', async ({ page }) => {
    await page.goto('/#/campo-harmonico')
    await page.locator('#tonalidade').selectOption('7')

    await page.reload()
    await expect(page.locator('#tonalidade')).toHaveValue('7')
  })

  test('usar Intervalos não altera mtt.bestScore existente', async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => localStorage.setItem('mtt.bestScore', '15'))

    await page.goto('/#/campo-harmonico')
    await page.locator('#tonalidade').selectOption('7')
    await page.goto('/#/intervalos')
    await page.locator('#nota-origem').selectOption('10')
    await page.locator('#nota-destino').selectOption('2')

    const bestScore = await page.evaluate(() => localStorage.getItem('mtt.bestScore'))
    expect(bestScore).toBe('15')
  })
})
