import { marked } from 'marked';

const BASE = import.meta.env.BASE_URL; // e.g. "/resume/"

marked.setOptions({ breaks: false, gfm: true });

// The YAML descriptions use literal "• " bullets, **bold**, [links](),
// <mark> tags, and an embedded <video> block. Normalize bullets to real
// markdown list items so they render as proper <ul><li>.
function normalizeBullets(md: string): string {
  return md
    .split('\n')
    .map((line) => line.replace(/^(\s*)•\s+/, '$1- '))
    .join('\n');
}

// Resolve "assets/..." references against the deploy base path.
function fixAssetPaths(html: string): string {
  return html.replace(/(src|href)="assets\//g, `$1="${BASE}assets/`);
}

// Rich rendering for the web view: keeps <mark> chips and the video.
export function renderWeb(md: string | undefined): string {
  if (!md) return '';
  return fixAssetPaths(marked.parse(normalizeBullets(md)) as string);
}

// ATS-safe rendering for the print/PDF view: single column, no video,
// no emoji, <mark> keywords flattened to plain selectable text.
export function renderPrint(md: string | undefined): string {
  if (!md) return '';
  let src = md
    // drop the embedded video block (and any wrapping div)
    .replace(/<div[^>]*>\s*<video[\s\S]*?<\/video>\s*<\/div>/gi, '')
    .replace(/<video[\s\S]*?<\/video>/gi, '');
  let html = marked.parse(normalizeBullets(src)) as string;
  // flatten <mark> to plain text so keywords survive ATS parsing
  html = html.replace(/<\/?mark>/gi, '');
  // strip leftover inline images (e.g. youtube logo)
  html = html.replace(/<img[^>]*>/gi, '');
  return fixAssetPaths(html);
}

// Extract the trailing <mark> keywords from a description as a flat list,
// used to render dedicated skill chips on the web cards.
export function extractTags(md: string | undefined): string[] {
  if (!md) return [];
  const tags = [...md.matchAll(/<mark>(.*?)<\/mark>/gi)].map((m) => m[1].trim());
  return [...new Set(tags)];
}

// Description with the trailing <mark> block removed (so we can render tags
// separately as chips on the web).
export function renderWebBody(md: string | undefined): string {
  if (!md) return '';
  const withoutTags = md.replace(/<mark>.*?<\/mark>/gi, '').replace(/^\s*(iOS|Android)\s*:\s*$/gim, '');
  return renderWeb(withoutTags);
}
