interface ITagOption {
  value: string;
  label: string;
}

const tagsOptions = [
  { value: "education", label: "Education" },
  { value: "entertainment", label: "Entertainment" },
  { value: "news", label: "News" },
  { value: "podcast", label: "Podcast" },
  { value: "shopping", label: "Shopping" },
  { value: "sports", label: "Sports" },
  { value: "travel", label: "Travel" },
];

export { tagsOptions };
export type { ITagOption };
