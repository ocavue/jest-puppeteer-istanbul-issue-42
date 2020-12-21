describe("e2e test", () => {
    test("main", async () => {
        await page.goto("http://localhost:8081")
        await page.waitForSelector('#math-result')
        let text = await page.$eval('#math-result', (el) => el.innerHTML)
        expect(text).toContain("100")
    })
})