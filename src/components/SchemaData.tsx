import { baseUrl } from "@/lib/constants";

export default function SchemaData({ data }: { data: any }) {
  if (!data.url) {
    data.url = baseUrl;
  }

  if (data.url !== baseUrl) {
    data.url = `${baseUrl}${data.url}`;
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          ...data,
        }),
      }}
    />
  );
}
