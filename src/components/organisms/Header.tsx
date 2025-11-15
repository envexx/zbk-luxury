'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/atoms/Button';
import AuthModal from '@/components/organisms/AuthModal';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/utils/cn';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Fleet', href: '/fleet' },
    { name: 'Services', href: '/services' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleAuthClick = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-deep-navy/80 backdrop-blur-md border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <Image
                  src="/Logo.png"
                  alt="ZBK Luxury Car Rental"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                  priority
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-white hover:text-luxury-gold transition-colors duration-micro relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-luxury-gold transition-all duration-micro group-hover:w-full"></span>
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 text-white hover:text-luxury-gold transition-colors"
                  >
                    <div className="w-8 h-8 bg-luxury-gold rounded-full flex items-center justify-center">
                      <span className="text-deep-navy font-semibold text-sm">
                        {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                      </span>
                    </div>
                    <span className="text-sm font-medium">
                      {user?.firstName} {user?.lastName}
                    </span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* User Dropdown Menu */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-200">
                        <p className="text-sm font-medium text-gray-900">{user?.firstName} {user?.lastName}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        My Profile
                      </Link>
                      <Link
                        href="/bookings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        My Bookings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button
                    onClick={() => handleAuthClick('login')}
                    className="text-white hover:text-luxury-gold transition-colors font-medium"
                  >
                    Sign In
                  </button>
                  <Button 
                    variant="primary" 
                    size="medium"
                    onClick={() => handleAuthClick('signup')}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-luxury-gold hover:bg-off-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-luxury-gold transition-colors duration-micro"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isMobileMenuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-deep-navy bg-opacity-50" onClick={toggleMobileMenu}></div>
          
          <div className="fixed left-0 top-0 h-full w-80 max-w-[90vw] bg-deep-navy shadow-xl transform transition-transform duration-entrance ease-entrance">
            {/* Mobile menu header */}
            <div className="flex items-center justify-between p-4 border-b border-white border-opacity-10">
              <Image
                src="/Logo.png"
                alt="ZBK Luxury Car Rental"
                width={120}
                height={40}
                className="h-10 w-auto filter invert"
              />
              <button
                onClick={toggleMobileMenu}
                className="text-white hover:text-luxury-gold transition-colors duration-micro"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Mobile menu items */}
            <nav className="px-4 py-6 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'block px-4 py-3 text-sm font-medium text-white hover:bg-luxury-gold hover:bg-opacity-20 hover:border-l-4 hover:border-luxury-gold rounded-r transition-all duration-micro',
                    'border-b border-white border-opacity-10 last:border-b-0'
                  )}
                  onClick={toggleMobileMenu}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="pt-4">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 px-4 py-3 bg-luxury-gold bg-opacity-10 rounded-lg">
                      <div className="w-10 h-10 bg-luxury-gold rounded-full flex items-center justify-center">
                        <span className="text-deep-navy font-semibold">
                          {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{user?.firstName} {user?.lastName}</p>
                        <p className="text-gray-300 text-sm">{user?.email}</p>
                      </div>
                    </div>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-white hover:bg-luxury-gold hover:bg-opacity-20 rounded"
                      onClick={toggleMobileMenu}
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/bookings"
                      className="block px-4 py-2 text-white hover:bg-luxury-gold hover:bg-opacity-20 rounded"
                      onClick={toggleMobileMenu}
                    >
                      My Bookings
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        toggleMobileMenu();
                      }}
                      className="block w-full text-left px-4 py-2 text-red-400 hover:bg-red-500 hover:bg-opacity-20 rounded"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        handleAuthClick('login');
                        toggleMobileMenu();
                      }}
                      className="block w-full px-4 py-2 text-white hover:bg-luxury-gold hover:bg-opacity-20 rounded font-medium"
                    >
                      Sign In
                    </button>
                    <Button 
                      variant="primary" 
                      size="medium" 
                      className="w-full"
                      onClick={() => {
                        handleAuthClick('signup');
                        toggleMobileMenu();
                      }}
                    >
                      Sign Up
                    </Button>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </>
  );
};

export default Header;
