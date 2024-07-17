import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'
import { doAct } from 'lib/doAct'
import { PlayerProvider } from 'lib/playerContext'
import { WindowProvider } from 'lib/windowContext'
import React from 'react'

import { Player } from '.'
import { PlayerDrawer } from './PlayerDrawer'

// import './multiLayer.jest.setup.tsx' // Import the setup file

// Mocking the playerHelper functions
jest.mock('../../lib/playerHelper', () => ({
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
  SongDetails: ({ activeSong }: { activeSong: { title: string } }) => (
    <div data-testid="SongDetails">SongDetails: {activeSong.title}</div>
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

jest.mock('../PortableTextView', () => ({
  PortableTextView: () => <div>PortableTextView</div>,
}))
jest.mock('../SongList', () => ({
  SongList: () => <div>SongList</div>,
}))
jest.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
  default: (props: any) => <img {...props} />,
}))
jest.mock('../../lib/sanity.image', () => ({
  urlForImage: () => ({ url: () => 'test-url' }),
}))

describe('Player and PlayerDrawer Multi-layer Test with Context', () => {
  const mockDispatch = jest.fn()
  const mockPlayerState = {
    activeSong: {
      title: 'Test Song',
      album: { title: 'Test Album', coverImage: {} },
    },
    playlist: [{ title: 'Test Song' }],
    isDrawerExpanded: true,
    toggleExpandDrawer: jest.fn(),
  }
  const mockWindowState = {
    scrollY: 0,
    height: 800,
    width: 1024,
  }

  beforeEach(() => {
    jest.clearAllMocks()
    jest.mock('../../lib/playerContext', () => ({
      usePlayerContext: () => ({
        dispatch: mockDispatch,
        state: mockPlayerState,
      }),
    }))
    jest.mock('../../lib/windowContext', () => ({
      useWindowContext: () => mockWindowState,
    }))
  })

  const renderWithProviders = () => {
    return render(
      <PlayerProvider>
        <WindowProvider>
          <Player />
          <PlayerDrawer />
        </WindowProvider>
      </PlayerProvider>,
    )
  }

  it('should render both Player and PlayerDrawer components and interact with them', () => {
    renderWithProviders()

    // Check if Player and PlayerDrawer contents are rendered
    expect(screen.getByTestId('SongDetails')).toHaveTextContent(
      'SongDetails: Test Song by Test Artist',
    )
    expect(screen.getByText('Next up')).toBeInTheDocument()
    expect(screen.getByText('SongList')).toBeInTheDocument()

    // Simulate interactions
    fireEvent.click(screen.getByText('Play/Pause'))
    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: expect.any(String) }),
    )

    fireEvent.click(screen.getByText('Next'))
    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: expect.any(String) }),
    )

    fireEvent.click(screen.getByText('Raise Volume'))
    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: expect.any(String) }),
    )

    fireEvent.click(screen.getByTestId('ToggleDrawerButton'))
    expect(mockPlayerState.toggleExpandDrawer).toHaveBeenCalled()
  })

  it('should update the slider position', () => {
    renderWithProviders()

    // Simulate currentTime update
    doAct([
      {
        type: 'SET_ACTIVE_SONG',
        payload: {
          song: { _id: '1', title: 'Updated Song' },
        },
      },
      {
        type: 'SET_LOADING',
        payload: false,
      },
    ])

    // Check if the slider updates correctly
    expect(screen.getByTestId('AudioSlider')).toHaveTextContent(
      'AudioSlider: 50 / 300',
    )
  })

  it('should handle window context updates', () => {
    renderWithProviders()

    const expectedHeight = mockWindowState.height - 82

    // Verify initial drawer styles
    const drawer = screen.getByRole('tabpanel').parentElement
    expect(drawer).toHaveStyle({ top: '0px', height: `${expectedHeight}px` })

    // Simulate window scroll
    // doAct({
    //   type: 'SET_WINDOW_SCROLL',
    //   payload: { scrollY: 100 },
    // })

    expect(drawer).toHaveStyle({ top: '100px', height: `${expectedHeight}px` })
  })

  it('should handle tab interactions', () => {
    renderWithProviders()

    // Interact with tabs
    fireEvent.click(screen.getByText('Lyrics'))
    expect(screen.getByRole('tab', { selected: true })).toHaveTextContent(
      'Lyrics',
    )
  })

  it('should respond to playerState changes (new active song)', () => {
    renderWithProviders()

    // Use a dispatch action to update the state
    doAct({
      type: 'SET_ACTIVE_SONG_AND_PLAYLIST',
      payload: {
        song: { _id: '123', title: 'New Song' },
        playlist: [],
      },
    })

    // Check if the updated song details are rendered
    expect(screen.getByTestId('SongDetails')).toHaveTextContent(
      'SongDetails: New Song by New Artist',
    )
    expect(screen.getByTestId('PlayControls')).toHaveTextContent('Playing')
    expect(screen.getByTestId('AudioSlider')).toHaveTextContent(
      'AudioSlider: 100 / 400',
    )
  })

  it('should respond to playerState changes (loading state)', () => {
    renderWithProviders()

    // Use a dispatch action to update the state
    doAct({
      type: 'SET_LOADING',
      payload: true,
    })

    // Check if the loading state is reflected
    expect(screen.getByText('Play/Pause')).toBeDisabled()
  })

  it('should respond to playerState changes (drawer expanded)', () => {
    renderWithProviders()

    // Use a dispatch action to update the state
    doAct({
      type: 'SET_DRAWER_EXPANDED',
      payload: true,
    })

    // Check if the drawer is expanded
    expect(screen.getByTestId('ToggleDrawerButton')).toHaveTextContent(
      'Collapse',
    )
  })

  it('should respond to playerState changes (currentTime update)', () => {
    renderWithProviders()

    // Use a dispatch action to update the state
    doAct({
      type: 'SET_ACTIVE_SONG',
      payload: { song: { _id: '123', title: 'Test Song' } },
    })

    // Check if the slider updates correctly with new currentTime
    expect(screen.getByTestId('AudioSlider')).toHaveTextContent(
      'AudioSlider: 200 / 300',
    )
  })

  it('should respond to playerState changes (volume change)', () => {
    renderWithProviders()

    // Use a dispatch action to update the state
    // doAct({
    //   type: 'SET_VOLUME',
    //   payload: 0.5,
    // })

    // Assuming VolumeControl updates accordingly
    expect(screen.getByTestId('VolumeControl')).toHaveTextContent(
      'VolumeControl',
    )
  })
})
