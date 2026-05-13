"use client"

import React from "react"

const SOUNDS = {
  add: "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3", // Modern soft pop
  success: "https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3", // Success chime
  error: "https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3", // Subtle error
}

export function useSoundEffect() {
  const play = React.useCallback((type: keyof typeof SOUNDS) => {
    try {
      const audio = new Audio(SOUNDS[type])
      audio.volume = 0.4
      audio.play().catch(e => console.log("Audio playback failed:", e))
    } catch (e) {
      console.error("Sound error:", e)
    }
  }, [])

  return { play }
}
