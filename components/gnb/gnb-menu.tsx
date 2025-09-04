import { useEffect, useRef } from "react";
import type { MouseEvent } from "react";

import { TUserType } from "@/types/user";
import { cn } from "@/utils/cn";
import { gnbMenuConfig } from "@/utils/gnb-menu-config";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

interface IGnbMenuProps {
  userType: TUserType;
}

const DEBOUNCE_MS = 300;

function GnbMenu({ userType }: IGnbMenuProps) {
  const pathname = usePathname();
  const router = useRouter();

  // 연속 클릭 시 마지막 클릭만 반영하기 위한 trailing debounce
  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastHrefRef = useRef<string | null>(null);

  const handleMenuClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    // 보조키(새 탭 열기 등)나 좌클릭이 아닌 경우는 기본 동작 허용
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }
    // 기본 내비게이션을 잠시 막고 마지막 클릭만 처리
    e.preventDefault();
    lastHrefRef.current = href;

    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
    }

    clickTimerRef.current = setTimeout(() => {
      const target = lastHrefRef.current;
      if (target) {
        const isSamePath = pathname === target;
        const hasQuery =
          typeof window !== "undefined" && window.location.search.length > 0;

        if (isSamePath && !hasQuery) {
          // 동일 경로 + 쿼리 없음: 라우터 재사용으로 인해 요청이 스킵될 수 있으므로 강제 새로고침 이벤트 발행
          window.dispatchEvent(new Event("job-posting-refresh"));
        } else {
          router.push(target);
        }
      }
      clickTimerRef.current = null;
      lastHrefRef.current = null;
    }, DEBOUNCE_MS);
  };

  // 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (clickTimerRef.current) {
        clearTimeout(clickTimerRef.current);
      }
    };
  }, []);

  return (
    <nav role="navigation" aria-label="Primary navigation">
      <ul className={cn("gap-28pxr flex")}>
        {gnbMenuConfig({ userType }).map((menu) => {
          const { text, link, disabled, isHighlight, isNew } = menu;

          if (disabled) {
            return null;
          }

          return (
            <li key={text}>
              <Link
                href={link}
                onClick={(e) => handleMenuClick(e, link)}
                className={cn(
                  "text-18pxr text-blackLight hover:text-blueDark active:text-blueDark relative block font-bold break-all transition-all duration-300 hover:scale-110 active:scale-110",
                  isHighlight && pathname === link && "text-black"
                )}
              >
                {isNew && (
                  <span
                    className={cn(
                      "px-4pxr text-10pxr -top-12pxr -right-16pxr bg-blueDefault absolute rounded text-white shadow-sm"
                    )}
                    aria-hidden
                  >
                    New
                  </span>
                )}
                {text}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export { GnbMenu };
