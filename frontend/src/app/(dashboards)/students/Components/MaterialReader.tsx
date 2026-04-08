import { useEffect, useState } from 'react';
import styles from './Reader.module.css';

export default function MaterialReader({ contentUri }: {contentUri: string}) {
  const [html, setHtml] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Fetch the transpiled HTML from your backend
    async function fetchContent() {
      const res = await fetch(`/api/materials/get-material-content?contentUri=${contentUri}`);
      const data = await res.json();
      setHtml(data); // This is the string from your useBaseTranspiler
    }
    fetchContent();
  }, [contentUri]);

  return (
    <div className={isDarkMode ? styles.darkTheme : styles.lightTheme}>
      <div className={styles.toolbar}>
        <button onClick={() => setIsDarkMode(!isDarkMode)}>
          {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      <main className={styles.readerContainer}>
        {/* This is how we render the backend HTML in Next.js */}
        <article 
          className={styles.articleBody}
          dangerouslySetInnerHTML={{ __html: html }} 
        />
      </main>
    </div>
  );
}