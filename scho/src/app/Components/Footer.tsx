import React from 'react';
import { SocialIcon } from 'react-social-icons';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Quick Links 1 */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/about" className="hover:text-gray-300">About</a></li>
            <li><a href="/services" className="hover:text-gray-300">Services</a></li>
            <li><a href="/contact" className="hover:text-gray-300">Contact</a></li>
          </ul>
        </div>

        {/* Quick Links 2 */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2">
            <li><a href="/privacy-policy" className="hover:text-gray-300">Privacy Policy</a></li>
            <li><a href="/terms-condition" className="hover:text-gray-300">Terms & Conditions</a></li>
            <li><a href="/collaboration" className="hover:text-gray-300">Collaboration</a></li>
          </ul>
        </div>

        {/* Quick Links 3 */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Opportunities</h3>
          <ul className="space-y-2">
            <li><a href="/partnership" className="hover:text-gray-300">Partnership</a></li>
            <li><a href="/sponsorship" className="hover:text-gray-300">Sponsorship</a></li>
            <li><a href="/course" className="hover:text-gray-300">Our School</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div className='flex flex-col items-center-start'>
          <h3 className="text-lg text-center lg:text-center-left font-semibold mb-4">Follow Us</h3>
          <div className="flex justify-center  space-x-4">
            <div className="flex space-x-4 hover:scale-110 transition-transform">
              <SocialIcon url="https://www.facebook.com/profile.php?id=61577237818068" target="_blank" rel="noopener noreferrer" style={{ height: 30, width: 30 }} />
            </div>
            <div className="flex space-x-4 hover:scale-110 transition-transform">
              <SocialIcon url="https://x.com/Gensto_code" target="_blank" rel="noopener noreferrer" style={{ height: 30, width: 30 }} />
            </div>
            <div className="flex space-x-4 hover:scale-110 transition-transform">
              <SocialIcon url="https://www.instagram.com/gensto_hub?igsh=NTJ0bjYxbXB5eDFs&utm_source=qr " target="_blank" rel="noopener noreferrer" style={{ height: 30, width: 30 }} />
            </div>
            <div className="flex space-x-4 hover:scale-110 transition-transform">
              <SocialIcon url="https://linkedin.com/in/YourPage" target="_blank" rel="noopener noreferrer" style={{ height: 30, width: 30 }} />
            </div>
            <div className="flex space-x-4 hover:scale-110 transition-transform">
              <SocialIcon url="https://tiktok.com/@YourPage" target="_blank" rel="noopener noreferrer" style={{ height: 30, width: 30 }} />
            </div>
            <div className="flex space-x-4 hover:scale-110 transition-transform">
              <SocialIcon url="https://youtube.com/@gensto-code?si=NYmqrr7odwEDkqBE" target="_blank" rel="noopener noreferrer" style={{ height: 30, width: 30 }} />

            </div>
          </div>

        </div>
      </div>


      {/* Copyright */}
      <div className="mt-10 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Prep Center. All rights reserved.
      </div>
    </footer>
  );
};
