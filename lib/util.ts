export const isNonEmptyString = (value: any): boolean => {
  return typeof value === 'string' && value.length > 0
}
