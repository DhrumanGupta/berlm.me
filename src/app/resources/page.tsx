import ListingPage from "@/components/listing/ListingPage";
import ResourceSection from "@/components/resources/ResourceSection";
import { resources } from "@/lib/resources";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources",
  description: "Course materials, lecture notes, and other useful links.",
  alternates: {
    canonical: `/resources`,
  },
};

export default function ResourcesPage() {
  return (
    <ListingPage
      intro={<p>Course materials, lecture notes, and other useful links.</p>}
      isEmpty={resources.length === 0}
    >
      {resources.map((section) => (
        <ResourceSection key={section.title} section={section} />
      ))}
    </ListingPage>
  );
}
