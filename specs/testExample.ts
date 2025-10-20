describe('TypeScript sanity test', () => {
  it('should run basic TS test', () => {
    const x: number = 5;
    const y: number = 10;
    expect(x + y).toBe(15)
  })
})
