export const AUTHOR_NAME = "Dhruman Gupta";

export type PublicationLinks = {
  paper?: string;
  arxiv?: string;
  code?: string;
  openreview?: string;
};

export type Publication = {
  title: string;
  authors: string[];
  venue: string;
  year: number;
  status?: string;
  links?: PublicationLinks;
};

export const publications: Publication[] = [
  {
    title:
      "Joint 3D Gravity and Magnetic Inversion via Rectified Flow and Ginzburg-Landau Guidance",
    authors: [
      "Dhruman Gupta",
      "Yashas Shende",
      "Aritra Das",
      "Chanda Grover Kamra",
      "Debayan Gupta",
    ],
    venue: "arXiv preprint",
    year: 2026,
    status: "Preprint",
    links: {
      arxiv: "https://arxiv.org/abs/2603.06829",
    },
  },
  {
    title:
      "Fundamental limits for weighted empirical approximations of exponentially tilted distributions",
    authors: [
      "Sarvesh Ravichandran Iyer",
      "Himadri Mandal",
      "Dhruman Gupta",
      "Rushil Gupta",
      "Agniv Bandyopadhyay",
      "Achal Bassamboo",
      "Sandeep Kumar Juneja",
      "Varun Gupta",
    ],
    venue: "AISTATS",
    year: 2026,
    links: {
      openreview: "https://openreview.net/forum?id=gmmtcjRs0O",
      arxiv: "https://arxiv.org/abs/2512.23979",
      code: "https://github.com/aistats20252404/codebase",
    },
  },
];

export function getLatestPublications(count = 3) {
  return [...publications].sort((a, b) => b.year - a.year).slice(0, count);
}

export function getPrimaryPublicationLink(publication: Publication) {
  const { links } = publication;
  if (!links) return undefined;

  return links.paper ?? links.arxiv ?? links.openreview ?? links.code;
}
