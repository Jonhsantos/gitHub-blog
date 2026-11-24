export function stripMarkdown(md: string | null | undefined): string {
  if (!md) return '';
  let text = md;
  // code blocks
  text = text.replace(/```[\s\S]*?```/g, ' ');
  text = text.replace(/`[^`]*`/g, ' ');
  // images/links
  text = text.replace(/!\[[^\]]*\]\([^)]*\)/g, ' ');
  text = text.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1');
  // headings/bold/italic/quotes
  text = text.replace(/[#>*_~\-]+/g, ' ');
  // collapse whitespace
  text = text.replace(/\s+/g, ' ').trim();
  return text;
}

export function truncate(text: string, max = 160): string {
  if (text.length <= max) return text;
  return text.slice(0, max).trimEnd() + '…';
}

export function normalizeSearch(input: string): string {
  return input.trim().replace(/\s+/g, ' ');
}
