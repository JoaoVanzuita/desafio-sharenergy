export const numberMaskInput = (ev: React.KeyboardEvent) => {
  if (/^[0-9]/.test(ev.key) ||
    ev.key === 'Backspace' ||
    ev.key === 'Delete' ||
    ev.key === 'Home' ||
    ev.key === 'End' ||
    ev.key === 'ArrowLeft' ||
    ev.key === 'ArrowRight'
  ) return

  ev.preventDefault()
}