import { FileUser, IdCard, ScanSearch, Store, UserSearch } from "lucide-react";

import { TUserType } from "@/types/user";

import { cn } from "./cn";

interface IGnbMenuConfigParams {
  userType: TUserType;
}

function gnbMenuConfig({ userType }: IGnbMenuConfigParams) {
  return [
    {
      text:
        userType === "COMPANY" || userType === "ADMIN"
          ? "workerPool"
          : "button.registerOrEditResume",
      link:
        userType === "COMPANY" || userType === "ADMIN"
          ? "/worker-pool"
          : "/registration/resume/personal-info",
      icon:
        userType === "COMPANY" || userType === "ADMIN" ? (
          <UserSearch className={cn("size-20pxr")} />
        ) : (
          <FileUser className={cn("size-20pxr")} />
        ),
      isHighlight: true,
      disabled: userType === null || userType === undefined,
    },
    {
      text: "workerPool",
      link: "/worker-pool",
      icon: <UserSearch className={cn("size-20pxr")} />,
      isHighlight: false,
      disabled: userType,
    },
    {
      text: "jobPosting",
      link: "/job-posting",
      icon: <ScanSearch className={cn("size-20pxr")} />,
      isHighlight: true,
      isNew: false,
    },
    {
      text: "visaConsulting",
      link: `/visa-consulting`,
      icon: <IdCard className={cn("size-20pxr")} />,
      isHighlight: true,
      isNew: false,
    },
    {
      text: "title.workMall",
      link: "/work-mall",
      icon: <Store className={cn("size-20pxr")} />,
      isHighlight: true,
      isNew: false,
    },
    // { text: t('gnb.menu.referenceCheck'), link: `/#` },
  ];
}

export { gnbMenuConfig };
