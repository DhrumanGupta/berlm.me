import { baseUrl } from "@/lib/constants";

function resolveSchemaUrl(url: string | undefined): string {
  if (!url) return baseUrl;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("/")) return `${baseUrl}${url}`;
  return `${baseUrl}/${url}`;
}

export default function SchemaData({ data }: { data: Record<string, unknown> }) {
  const schema = {
    "@context": "https://schema.org",
    ...data,
    url: resolveSchemaUrl(data.url as string | undefined),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
