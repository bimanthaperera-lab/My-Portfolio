/**
 * CV / résumé download.
 *
 * Drop your PDF into src/assets/cv/ (any file name, e.g. Bimantha-Perera-CV.pdf).
 * Vite picks it up at build time and every "Download CV" button appears.
 * With no PDF there, the buttons stay hidden, so the site never links to a 404.
 * Replace the file to update it; the URL gets a new hash, so no stale caches.
 */

const files = import.meta.glob<string>("../assets/cv/*.pdf", {
  eager: true,
  query: "?url",
  import: "default",
});

const [path, url] = Object.entries(files)[0] ?? [];

export const resume = url
  ? {
      url,
      /** File name visitors get when they save it. */
      fileName: path!.split("/").pop()!,
    }
  : null;
