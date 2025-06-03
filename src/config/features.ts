export const FEATURES = {
  SHOW_HEADER_LINKS: false, // Set to true to enable Projects and Blog links
} as const;

export type Features = typeof FEATURES; 