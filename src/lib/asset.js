// Paths to files in /public, so the site also works from a sub-folder.
export const asset = path => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
