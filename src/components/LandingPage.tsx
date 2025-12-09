import React, { useEffect, useRef, useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import WorldMap from './ui/world-map';

const LandingPage: React.FC<{ onEnter: () => void; onVesselLogin: () => void; onLogout?: () => void; skipAnimations?: boolean }> = ({ onEnter, onVesselLogin, onLogout, skipAnimations = false }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const vesselLoginRef = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (skipAnimations) {
      // Skip animations - make everything visible immediately
      const title = titleRef.current;
      const subtitle = subtitleRef.current;
      const cta = ctaRef.current;
      const vesselLogin = vesselLoginRef.current;

      if (title) {
        title.style.transform = 'translateY(0)';
        title.style.opacity = '1';
      }
      if (subtitle) {
        subtitle.style.transform = 'translateY(0)';
        subtitle.style.opacity = '1';
      }
      if (cta) {
        cta.style.transform = 'scale(1)';
        cta.style.opacity = '1';
      }
      if (vesselLogin) {
        vesselLogin.style.transform = 'scale(1)';
        vesselLogin.style.opacity = '1';
      }
      return;
    }

    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const cta = ctaRef.current;
    const vesselLogin = vesselLoginRef.current;

    if (!title || !subtitle || !cta || !vesselLogin) return;

    title.animate([
      { transform: 'translateY(20px)', opacity: 0 },
      { transform: 'translateY(0)', opacity: 1 }
    ], { duration: 700, easing: 'ease-out', fill: 'forwards' });

    subtitle.animate([
      { transform: 'translateY(20px)', opacity: 0 },
      { transform: 'translateY(0)', opacity: 1 }
    ], { duration: 600, delay: 300, easing: 'ease-out', fill: 'forwards' });

    cta.animate([
      { transform: 'scale(0.9)', opacity: 0 },
      { transform: 'scale(1)', opacity: 1 }
    ], { duration: 500, delay: 550, easing: 'ease-out', fill: 'forwards' });

    vesselLogin.animate([
      { transform: 'scale(0.9)', opacity: 0 },
      { transform: 'scale(1)', opacity: 1 }
    ], { duration: 500, delay: 700, easing: 'ease-out', fill: 'forwards' });
  }, [skipAnimations]);

  return (
    <div className="min-h-screen bg-marine-blue text-white overflow-hidden relative">
      <div className="absolute inset-0 opacity-70">
        <div className="h-full w-full">
          <WorldMap />
        </div>
      </div>

      {/* Top Navigation Bar - Mobile: Hamburger Menu, Desktop: Full Menu */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-marine-blue/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
                <span className="text-lg sm:text-xl font-bold">S</span>
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold">SAGAR</h2>
                <p className="text-[10px] sm:text-xs text-white/70 hidden sm:block">Marine Research Platform</p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={onEnter}
                className="px-4 py-2 bg-marine-cyan text-marine-blue font-semibold rounded-lg hover:bg-marine-cyan/90 transition-colors"
              >
                Enter Dashboard
              </button>
              <button
                onClick={onVesselLogin}
                className="px-4 py-2 bg-marine-teal text-white font-semibold rounded-lg hover:bg-marine-teal/90 transition-colors"
              >
                Vessel Login
              </button>
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="px-4 py-2 bg-red-600/20 border border-red-500/30 text-red-200 font-semibold rounded-lg hover:bg-red-600/30 transition-colors"
                >
                  Logout
                </button>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {menuOpen && (
            <div className="md:hidden border-t border-white/10 pb-4">
              <div className="flex flex-col space-y-2 pt-4">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onEnter();
                  }}
                  className="w-full text-left px-4 py-3 bg-marine-cyan/20 hover:bg-marine-cyan/30 rounded-lg font-semibold transition-colors"
                >
                  Enter Dashboard
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onVesselLogin();
                  }}
                  className="w-full text-left px-4 py-3 bg-marine-teal/20 hover:bg-marine-teal/30 rounded-lg font-semibold transition-colors"
                >
                  Vessel Login
                </button>
                {onLogout && (
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onLogout();
                    }}
                    className="w-full text-left px-4 py-3 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 rounded-lg font-semibold text-red-200 transition-colors"
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content - Centered Hero */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 pt-20 sm:pt-24 pb-12">
        <div className="max-w-5xl mx-auto text-center">
          <h1 ref={titleRef} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 sm:mb-6" style={{ transform: 'translateY(20px)', opacity: 0 }}>
            SAGAR
          </h1>
          <p ref={subtitleRef} className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-10 max-w-2xl mx-auto" style={{ transform: 'translateY(20px)', opacity: 0 }}>
            Spatio-temporal Analytics Gateway for Aquatic Resources
          </p>
          
          {/* Desktop: Show buttons, Mobile: Hide (use hamburger menu) */}
          <div className="hidden md:flex items-center justify-center gap-4">
            <button
              ref={ctaRef}
              onClick={onEnter}
              className="px-6 py-3 bg-marine-cyan text-marine-blue font-semibold rounded-lg hover:shadow-lg hover:shadow-marine-cyan/25 transition-all text-base"
              style={{ transform: 'scale(0.9)', opacity: 0 }}
            >
              Enter Dashboard
            </button>
            <button
              ref={vesselLoginRef}
              onClick={onVesselLogin}
              className="px-6 py-3 bg-marine-teal text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-marine-teal/25 transition-all text-base"
              style={{ transform: 'scale(0.9)', opacity: 0 }}
            >
              Vessel Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;


