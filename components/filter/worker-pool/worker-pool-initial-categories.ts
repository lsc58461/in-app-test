import { FilterCategory } from "@/hooks/use-filter";

function workerPoolInitialCategories() {
  const initialCategories: FilterCategory[] = [
    {
      id: "residence",
      label: "Region",
      type: "modal",
      options: [], // 빈 배열로 초기화 - 모달 타입은 사용자 입력에 따라 동적으로 옵션이 추가됨
    },
    {
      id: "nationality",
      label: "Nationality",
      type: "modal",
      options: [], // 빈 배열로 초기화 - 모달 타입은 사용자 입력에 따라 동적으로 옵션이 추가됨
    },
    {
      id: "currentVisaType",
      label: "Current Visa",
      type: "modal",
      options: [], // 빈 배열로 초기화 - 모달 타입은 사용자 입력에 따라 동적으로 옵션이 추가됨
    },
    {
      id: "preferredVisaType",
      label: "Preferred Visa",
      type: "modal",
      options: [], // 빈 배열로 초기화 - 모달 타입은 사용자 입력에 따라 동적으로 옵션이 추가됨
    },
    {
      id: "education",
      label: "Education",
      type: "checkbox",
      options: [
        { id: "HIGHSCHOOL", label: "High School", checked: false },
        {
          id: "LANGUAGE_SCHOOL",
          label: "Language School",
          checked: false,
        },
        { id: "ASSOCIATE", label: "Associate", checked: false },
        { id: "BACHELOR", label: "Bachelor", checked: false },
        { id: "MASTER", label: "Master", checked: false },
        { id: "DOCTOR", label: "Doctor", checked: false },
      ],
    },
    {
      id: "gender",
      label: "Gender",
      type: "checkbox",
      options: [
        { id: "MALE", label: "Male", checked: false },
        { id: "FEMALE", label: "Female", checked: false },
      ],
    },
    {
      id: "overtime",
      label: "Over Time",
      type: "radio",
      options: [
        { id: "preferred", label: "Preferred", checked: false },
        { id: "notPreferred", label: "Not Preferred", checked: false },
      ],
    },
    {
      id: "isRelocate",
      label: "Move Region",
      type: "radio",
      options: [
        {
          id: "canMove",
          label: "Move Region Possible",
          checked: false,
        },
        {
          id: "nearbyRegion",
          label: "Move Region Impossible",
          checked: false,
        },
      ],
    },
    {
      id: "etc",
      label: "ETC",
      type: "checkbox",
      options: [
        {
          id: "isRecommendedTalent",
          label: "View Recommended Workers",
          checked: false,
        },
        {
          id: "isCreator",
          label: "View Creator",
          checked: false,
        },
        {
          id: "golfCaddyAspirants",
          label: "View Golf Caddy Candidates",
          checked: false,
        },
      ],
    },
    {
      id: "updatedAt",
      label: "Update Period Selection",
      type: "radio",
      options: [
        {
          id: "3days",
          label: "3 days",
          checked: false,
        },
        {
          id: "7days",
          label: "7 days",
          checked: false,
        },
        {
          id: "1month",
          label: "1 month",
          checked: false,
        },
        {
          id: "3month",
          label: "3 month",
          checked: false,
        },
        {
          id: "6month",
          label: "6 month",
          checked: false,
        },
        {
          id: "12month",
          label: "12 month",
          checked: false,
        },
        {
          id: "24month",
          label: "24 month",
          checked: false,
        },
      ],
    },
  ];

  return initialCategories;
}

export { workerPoolInitialCategories };
