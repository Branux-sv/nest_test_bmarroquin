import * as cheerio from 'cheerio';
import { ParsedMail } from 'mailparser';

const urlRegex = /(https?:\/\/[^\s]+)/g;

export const isValidUrl = (urlString: string): boolean => {
  try {
    const url = new URL(urlString);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
};

export const extractLinksFromEmail = (parsedEmail: ParsedMail): string[] => {
  const links: Set<string> = new Set();

  //Extract from HTML body
  if (parsedEmail.html) {
    const jQueryFn = cheerio.load(parsedEmail.html);
    jQueryFn('a[href]').each((_, element) => {
      const href = jQueryFn(element).attr('href');
      if (href && isValidUrl(href)) {
        links.add(href);
      }
    });
  }

  //Extract from text body using regex
  if (parsedEmail.text) {
    const matches = parsedEmail.text.match(urlRegex);
    if (matches) {
      matches.forEach((url) => {
        const cleanUrl = url.replace(/[.,;>)]+$/, '');
        if (isValidUrl(cleanUrl)) {
          links.add(cleanUrl);
        }
      });
    }
  }

  if (links.size === 0) {
    throw new Error('No links found in email');
  }

  return Array.from(links);
};

/**
 * Finds JSON links within HTML content
 */
export const findJsonLinksInHtml = (
  htmlContent: string | Buffer,
  baseUrl: string,
): string[] => {
  const jsonLinks: Set<string> = new Set();

  const jQueryFn = cheerio.load(htmlContent);
  //Find all links
  jQueryFn('a[href]').each((_, element) => {
    const href = jQueryFn(element).attr('href');
    const text = jQueryFn(element).text().toLowerCase();

    if (!href) return;

    //Resolve relative URLs
    let absoluteUrl: string;
    try {
      absoluteUrl = new URL(href, baseUrl).toString();
    } catch {
      return;
    }

    //Check if link looks like JSON
    const isJsonUrl =
      href.toLowerCase().endsWith('.json') ||
      href.includes('json') ||
      text.includes('json') ||
      text.includes('download') ||
      text.includes('data');

    if (isJsonUrl) {
      jsonLinks.add(absoluteUrl);
    }
  });

  //Also look for direct JSON URLs in the page
  jQueryFn('a[href$=".json"], a[href*="json"]').each((_, element) => {
    const href = jQueryFn(element).attr('href');
    if (href) {
      try {
        const absoluteUrl = new URL(href, baseUrl).toString();
        jsonLinks.add(absoluteUrl);
      } catch {
        //Invalid URL, skip
      }
    }
  });

  return Array.from(jsonLinks);
};
