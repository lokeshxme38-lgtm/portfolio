import { useEffect } from "react";

const DEFAULT_TITLE = "Lokesh Yadav — Developer, C++ Problem Solver & Robotics Student";

/** Sets the tab title and meta description for the current route. */
export function useDocumentMeta(title?: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} — Lokesh Yadav` : DEFAULT_TITLE;
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previous = meta?.content;
    if (meta && description) meta.content = description;
    return () => {
      if (meta && previous !== undefined) meta.content = previous;
    };
  }, [title, description]);
}
