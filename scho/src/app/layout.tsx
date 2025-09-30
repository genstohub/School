
import './globals.css';
import { ReactNode } from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';



export const metadata = {
  title: 'Prep',
  description: 'Smart learning platform'
}



export default function RootLayout({ children } : {children:  ReactNode}){
  return(
    <html lang="en">
      <body><Header />{children}
        <Footer />
      </body>
     
    </html>
  )
}