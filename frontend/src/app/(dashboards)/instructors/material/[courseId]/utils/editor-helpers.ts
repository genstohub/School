import DOMPurify from 'dompurify';

export type StagedFiles = (File | null)[];

// 1. Safety: Strips out malicious scripts
// export const sanitizeEditorHTML = (html: string) => {
//   const refinedHtmlFromOnclickAtr = html.replace(/onclick=(['"])(.*?)\1/g, "baseclick=$1$2$1");
//   // /**You can use this to reverse the effect */
//   // let originalHtml = refinedHtmlFromOnclickAtr.replace(/baseclick=(['"])(.*?)\1/g, "onclick=$1$2$1"); 
//   return DOMPurify.sanitize(refinedHtmlFromOnclickAtr, {
//     ADD_TAGS: ["div", "button", "img", "aside"],
//     ADD_ATTR: ["contenteditable", "style", "class", "data-index", "data-mode", "baseclick"]
//   });
// };

export const sanitizeEditorHTML = (html: string) => {
  return DOMPurify.sanitize(html, {
    ADD_TAGS: ["div", "button", "img", "span"],
    ADD_ATTR: [
      "src",
      "data-index",
      "data-action",
      "class",
      "contenteditable",
      "style",
    ], // MUST HAVE data-action
  });
};


export const restoreBaseClickAttr = async (html: string) => { 
  // /**You can use this to reverse the effect */
  return  html.replace(/baseclick=(['"])(.*?)\1/g, "onclick=$1$2$1"); 
 }

// 2. Repair: Fixes broken images after you refresh the page
export const rehydrateImages = (editorElement: HTMLElement, files: StagedFiles) => {
  const images = editorElement.querySelectorAll('img');

  images.forEach((img) => {
    const indexAttr = img.getAttribute('data-index');
    if (indexAttr !== null) {
      const index = parseInt(indexAttr);
      const file = files[index];

      // Check if it's a valid File or Blob before creating URL
      if (file && (file instanceof File || file  as unknown instanceof Blob)) {
        const freshUrl = URL.createObjectURL(file);
        img.src = freshUrl;
        
        // Clean up: prevent memory leaks by revoking the URL when the image loads
        img.onload = () => URL.revokeObjectURL(freshUrl);
      }
    }
  });
};