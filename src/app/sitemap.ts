import { getAllNoteData } from "@/lib/notes";
import { baseUrl } from "@/lib/constants";

export default async function sitemap() {
  const notes = await getAllNoteData();
  const noteUrls =
    notes?.map((note) => ({
      url: `${baseUrl}/notes/${note.slug}`,
      lastModified: new Date(note.date),
    })) ?? [];

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/notes`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/publications`,
      lastModified: new Date(),
    },
    { url: `${baseUrl}/qotw`, lastModified: new Date() },
    ...noteUrls,
  ];
}
