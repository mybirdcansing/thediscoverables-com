interface Window {
  WebKitPlaybackTargetAvailabilityEvent: any
  MSStream: any
}
interface WebKitPlaybackTargetAvailabilityEvent extends Event {
  availability: 'available' | 'not-available'
}

interface HTMLMediaElement {
  webkitShowPlaybackTargetPicker(): void
}
