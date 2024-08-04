export interface SanityImage {
  _id?: string
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
    to?: {
      _type: 'file'
    }
  }
  hotspot?: {
    x: number
    y: number
  }
}
