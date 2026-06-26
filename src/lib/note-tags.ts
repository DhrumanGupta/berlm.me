interface KeywordMapping {
  [key: string]: string;
}

const KEYWORD_MAPPING: KeywordMapping = {
  life: "tag-life",
  university: "tag-university",
  project: "tag-project",
};

const getClassnameFromKeyword = (keyword: string): string => {
  return KEYWORD_MAPPING[keyword] || "tag-default";
};

export { getClassnameFromKeyword };
