/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { OpeningEnvelope } from './components/OpeningEnvelope';
import { InvitationLetter } from './components/InvitationLetter';
import { ReunionDetails } from './components/ReunionDetails';
import { AudioWidget } from './components/AudioWidget';
import { audioEngine } from './utils/audioPlayer';

export default function App() {
  const [guestName, setGuestName] = useState<string>('KELUARGA BESAR YAMIHI');
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);

  // Read URL query parameter "?to=..." if provided (e.g. ?to=Andi+%26+Partner)
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const recipient = urlParams.get('to') || urlParams.get('nama') || urlParams.get('guest');
      if (recipient) {
        setGuestName(recipient.trim());
      }
    } catch {
      // url search param extraction fallback
    }
  }, []);

  const handleOpenInvitation = () => {
    setIsOpened(true);
    // Start ambient background music on user interaction
    audioEngine.start();
    setIsPlayingMusic(true);

    // Smooth scroll to the letter section
    setTimeout(() => {
      const el = document.getElementById('invitation-letter-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  const handleToggleMusic = () => {
    const newState = audioEngine.toggle();
    setIsPlayingMusic(newState);
  };

  const handleScrollTo = (elementId: string) => {
    // If not opened yet and user clicks an internal section, open it
    if (!isOpened) {
      setIsOpened(true);
      audioEngine.start();
      setIsPlayingMusic(true);
    }
    setTimeout(() => {
      const el = document.getElementById(elementId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#382D24] selection:bg-[#CCDBCF] selection:text-[#253828]">
      {/* Top Bar Navigation */}
      <Navbar
        onScrollTo={handleScrollTo}
        onOpenInvitation={handleOpenInvitation}
        isOpened={isOpened}
      />

      {/* 01 — Opening Page */}
      <OpeningEnvelope
        guestName={guestName}
        onUpdateGuestName={setGuestName}
        onOpenInvitation={handleOpenInvitation}
        isOpened={isOpened}
      />

      {/* 02 — The Invitation Letter */}
      <InvitationLetter
        guestName={guestName}
        onExploreDetails={() => handleScrollTo('details-section')}
      />

      {/* 03 — The Reunion Details & RSVP */}
      <ReunionDetails guestName={guestName} />

      {/* Background Music Floating Player */}
      <AudioWidget
        isPlaying={isPlayingMusic}
        onTogglePlay={handleToggleMusic}
      />
    </div>
  );
}
