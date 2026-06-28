import ExternalLinkList from "@/components/listing/ExternalLinkList";
import ListingSection from "@/components/listing/ListingSection";
import SectionHeading from "@/components/listing/SectionHeading";
import type { ResourceSection as ResourceSectionData } from "@/lib/resources";
import { encodeHref } from "@/lib/urls";

export default function ResourceSection({
  section,
}: {
  section: ResourceSectionData;
}) {
  return (
    <ListingSection as="section">
      <SectionHeading as="h2">{section.title}</SectionHeading>
      <ExternalLinkList
        items={section.items.map((item) => ({
          label: item.label,
          href: encodeHref(item.href),
        }))}
      />
    </ListingSection>
  );
}
