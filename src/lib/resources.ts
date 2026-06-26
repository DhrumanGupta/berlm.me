export type ResourceItem = {
  label: string;
  href: string;
};

export type ResourceSection = {
  title: string;
  items: ResourceItem[];
};

export const resources: ResourceSection[] = [
  {
    title: "Introduction to Machine Learning (Spring 2026, Teaching Assistant)",
    items: [
      {
        label: "Auto Encoders and VAEs",
        href: "http://dhrumangupta.github.io/files/(V)AE and Sequence Modelling.pdf",
      },
      {
        label: "Introduction to Transformers",
        href: "http://dhrumangupta.github.io/files/Transformers.pdf",
      },
    ],
  },
];
