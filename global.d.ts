interface Window {
  WebKitPlaybackTargetAvailabilityEvent: any
}
interface WebKitPlaybackTargetAvailabilityEvent extends Event {
  availability: 'available' | 'not-available'
}

interface HTMLMediaElement {
  webkitShowPlaybackTargetPicker(): void
}
