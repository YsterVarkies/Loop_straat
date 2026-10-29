import { useEffect } from 'react';

// Sets the document title and description for each page.
export function usePageMeta({ title, description }) {
  useEffect(() => {
    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta && description) meta.setAttribute('content', description);
  }, [title, description]);
}
