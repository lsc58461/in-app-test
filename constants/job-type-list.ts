export type TJobType =
  | "FULLTIME"
  | "INTERNSHIP"
  | "PARTTIME"
  | "FREELANCER"
  | "INDIRECT_EMPLOYMENT";

const jobTypeList = (): {
  value: TJobType;
  text: string;
}[] => {
  return [
    {
      value: "FULLTIME",
      text: "label.fullTime",
    },
    {
      value: "INTERNSHIP",
      text: "label.internship",
    },
    {
      value: "PARTTIME",
      text: "label.partTime",
    },
    {
      value: "FREELANCER",
      text: "label.freelancer",
    },
    {
      value: "INDIRECT_EMPLOYMENT",
      text: "label.dispatchContractIntermediary",
    },
  ];
};

export { jobTypeList };
