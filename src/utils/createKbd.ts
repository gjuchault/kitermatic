export const createKbd = (theme: string) => {
  const themeTag = `${theme}-fg`

  return (str: string) =>
    [`{${themeTag}}`, `{bold}`, str, `{/bold}`, `{/${themeTag}}`].join('')
}
