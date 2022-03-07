import slugify from "@sindresorhus/slugify";

export default function generateSlug(
  id: string,
  username: string,
  title: string
): string {
  const slug = slugify(`${title}-${id}`, {
    customReplacements: [
      ["ü", "u"],
      ["Ü", "u"],
      ["ı", "i"],
      ["I", "i"],
      ["ö", "o"],
      ["Ö", "o"],
      ["ç", "c"],
      ["Ç", "c"],
      ["ş", "s"],
      ["Ş", "s"],
      ["ğ", "g"],
      ["Ğ", "g"],
    ],
  });
  return `/${username}/${slug}`;
}
