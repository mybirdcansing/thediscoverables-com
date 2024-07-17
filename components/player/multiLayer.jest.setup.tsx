// Mocking the playerHelper functions
jest.mock('lib/playerHelper', () => ({
  handleInnerClick: jest.fn(),
  isIOS: jest.fn(() => false),
}))

// Mocking the dependencies and child components
jest.mock('./AudioSlider', () => ({
  AudioSlider: ({
    currentTime,
    duration,
  }: {
    currentTime: number
    duration: number
  }) => (
    <div data-testid="AudioSlider">
      AudioSlider: {currentTime} / {duration}
    </div>
  ),
}))
jest.mock('./PlayControls', () => ({
  PlayControls: ({ isPlaying, toggleSong, playPrevious, playNext }: any) => (
    <div data-testid="PlayControls">
      <button onClick={toggleSong}>Play/Pause</button>
      <button onClick={playPrevious}>Previous</button>
      <button onClick={playNext}>Next</button>
      <span>{isPlaying ? 'Playing' : 'Paused'}</span>
    </div>
  ),
}))
jest.mock('./SongDetails', () => ({
  SongDetails: ({
    activeSong,
  }: {
    activeSong: { title: string; artist: string }
  }) => (
    <div data-testid="SongDetails">
      SongDetails: {activeSong.title} by {activeSong.artist}
    </div>
  ),
}))
jest.mock('./SongTime', () => ({
  SongTime: ({
    currentTime,
    duration,
  }: {
    currentTime: number
    duration: number
  }) => (
    <div data-testid="SongTime">
      SongTime: {currentTime} / {duration}
    </div>
  ),
}))
jest.mock('./ToggleDrawerButton', () => ({
  ToggleDrawerButton: ({ toggleExpandDrawer, isDrawerExpanded }: any) => (
    <button onClick={toggleExpandDrawer} data-testid="ToggleDrawerButton">
      {isDrawerExpanded ? 'Collapse' : 'Expand'}
    </button>
  ),
}))
jest.mock('./VolumeControl', () => ({
  VolumeControl: ({ lowerVolume, raiseVolume }: any) => (
    <div data-testid="VolumeControl">
      <button onClick={lowerVolume}>Lower Volume</button>
      <button onClick={raiseVolume}>Raise Volume</button>
    </div>
  ),
}))

jest.mock('components/PortableTextView', () => ({
  PortableTextView: () => <div>PortableTextView</div>,
}))
jest.mock('components/SongList', () => ({
  SongList: () => <div>SongList</div>,
}))
jest.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
  default: (props: any) => <img {...props} />,
}))
jest.mock('lib/sanity.image', () => ({
  urlForImage: () => ({ url: () => 'test-url' }),
}))
