
import './globals.css';
import { ReactNode } from 'react';



export const metadata = {
  title: 'Prep',
  description: 'Smart learning platform'
}



export default function RootLayout({ children } : {children:  ReactNode}){
  return(
    <html lang="en">
      <body>{children}
       
      </body>
     
    </html>
  )
}