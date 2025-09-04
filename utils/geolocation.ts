/**
 * 지오로케이션 관련 유틸리티 함수들
 */

import { toast } from "react-toastify";

/**
 * 인앱 브라우저 환경 감지
 */
export const detectInAppBrowser = (): {
  isInApp: boolean;
  browserType: string;
  hasLocationRestrictions: boolean;
} => {
  if (typeof window === "undefined") {
    return {
      isInApp: false,
      browserType: "unknown",
      hasLocationRestrictions: false,
    };
  }

  const userAgent = window.navigator.userAgent.toLowerCase();

  // 카카오톡 인앱 브라우저
  if (userAgent.includes("kakaotalk")) {
    return {
      isInApp: true,
      browserType: "kakaotalk",
      hasLocationRestrictions: true,
    };
  }

  // 네이버 앱 인앱 브라우저
  if (userAgent.includes("naver") || userAgent.includes("whale")) {
    return {
      isInApp: true,
      browserType: "naver",
      hasLocationRestrictions: true,
    };
  }

  // 라인 인앱 브라우저
  if (userAgent.includes("line")) {
    return {
      isInApp: true,
      browserType: "line",
      hasLocationRestrictions: true,
    };
  }

  // 페이스북 인앱 브라우저
  if (userAgent.includes("fban") || userAgent.includes("fbav")) {
    return {
      isInApp: true,
      browserType: "facebook",
      hasLocationRestrictions: true,
    };
  }

  // 인스타그램 인앱 브라우저
  if (userAgent.includes("instagram")) {
    return {
      isInApp: true,
      browserType: "instagram",
      hasLocationRestrictions: true,
    };
  }

  // 트위터 인앱 브라우저
  if (userAgent.includes("twitter")) {
    return {
      isInApp: true,
      browserType: "twitter",
      hasLocationRestrictions: true,
    };
  }

  // 웹뷰 일반 감지
  if (userAgent.includes("wv") || userAgent.includes("webview")) {
    return {
      isInApp: true,
      browserType: "webview",
      hasLocationRestrictions: true,
    };
  }

  return {
    isInApp: false,
    browserType: "browser",
    hasLocationRestrictions: false,
  };
};

export interface GeolocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
}

export interface GeolocationUtilOptions {
  onSuccess: (position: GeolocationPosition) => void;
  onError: (error: GeolocationPositionError) => void;
  coarseOptions?: GeolocationOptions;
  preciseOptions?: GeolocationOptions;
}

/**
 * 인앱 브라우저용 특별 처리가 포함된 지오로케이션 함수
 * 1차 저전력(coarse) 시도 → 실패 시 고정밀(precise) 재시도 로직 포함
 * 인앱 브라우저에서 위치 서비스 제약사항 고려
 */
export const getCurrentPositionWithRetry = ({
  onSuccess,
  onError,
  coarseOptions = {
    enableHighAccuracy: false,
    timeout: 20000,
    maximumAge: 30000,
  },
  preciseOptions = {
    enableHighAccuracy: true,
    timeout: 20000,
    maximumAge: 0,
  },
}: GeolocationUtilOptions): void => {
  // 인앱 브라우저 환경 감지
  const browserInfo = detectInAppBrowser();

  // 인앱 브라우저에서 위치 서비스 제약이 있는 경우 옵션 조정
  let adjustedCoarseOptions = coarseOptions;
  let adjustedPreciseOptions = preciseOptions;

  if (browserInfo.hasLocationRestrictions) {
    // 인앱 브라우저용 더 관대한 옵션
    adjustedCoarseOptions = {
      enableHighAccuracy: false,
      timeout: 30000, // 더 긴 타임아웃
      maximumAge: 60000, // 더 오래된 캐시도 허용
    };

    adjustedPreciseOptions = {
      enableHighAccuracy: false, // 인앱에서는 고정밀 비활성화
      timeout: 30000,
      maximumAge: 30000,
    };
  }

  let hasRetried = false;

  const retryErrorCallback = (error: GeolocationPositionError) => {
    console.error("Geolocation error:", error, {
      browserType: browserInfo.browserType,
      hasRestrictions: browserInfo.hasLocationRestrictions,
    });

    // 인앱 브라우저에서는 재시도 로직을 더 신중하게 처리
    if (
      !hasRetried &&
      (error.code === error.TIMEOUT ||
        error.code === error.POSITION_UNAVAILABLE)
    ) {
      hasRetried = true;

      // 인앱 브라우저에서는 더 간단한 재시도
      if (browserInfo.hasLocationRestrictions) {
        setTimeout(() => {
          try {
            window.navigator.geolocation.getCurrentPosition(
              onSuccess,
              (e) => {
                console.error("Geolocation retry error (in-app):", e);
                onError(e);
              },
              {
                enableHighAccuracy: false,
                timeout: 15000,
                maximumAge: 60000,
              }
            );
          } catch (e) {
            console.error("Geolocation retry call failed (in-app):", e);
            onError(error);
          }
        }, 1000); // 1초 대기 후 재시도
        return;
      }

      // 일반 브라우저에서는 기존 로직 유지
      try {
        window.navigator.geolocation.getCurrentPosition(
          onSuccess,
          (e) => {
            console.error("Geolocation retry error:", e);
            onError(e);
          },
          adjustedPreciseOptions
        );
        return;
      } catch (e) {
        console.error("Geolocation retry call failed:", e);
      }
    }

    // 최종 실패
    onError(error);
  };

  // 지오로케이션 API 지원 여부 체크
  if (!navigator.geolocation) {
    const unsupportedError = new GeolocationPositionError();
    Object.defineProperty(unsupportedError, "code", {
      value: GeolocationPositionError.POSITION_UNAVAILABLE,
      writable: false,
    });
    Object.defineProperty(unsupportedError, "message", {
      value: "Geolocation is not supported by this browser.",
      writable: false,
    });
    onError(unsupportedError);
    return;
  }

  // 인앱 브라우저에서는 permissions API 체크 건너뛰기 (지원하지 않는 경우가 많음)
  if (browserInfo.hasLocationRestrictions || !navigator.permissions) {
    window.navigator.geolocation.getCurrentPosition(
      onSuccess,
      retryErrorCallback,
      adjustedCoarseOptions
    );
    return;
  }

  // 일반 브라우저에서는 permissions API 체크 후 실행
  navigator.permissions
    .query({ name: "geolocation" as PermissionName })
    .then((result) => {
      if (result.state === "denied") {
        const deniedError = new GeolocationPositionError();
        Object.defineProperty(deniedError, "code", {
          value: GeolocationPositionError.PERMISSION_DENIED,
          writable: false,
        });
        Object.defineProperty(deniedError, "message", {
          value: "User denied the request for Geolocation.",
          writable: false,
        });
        onError(deniedError);
      } else {
        window.navigator.geolocation.getCurrentPosition(
          onSuccess,
          retryErrorCallback,
          adjustedCoarseOptions
        );
      }
    })
    .catch(() => {
      // permissions API 지원하지 않는 브라우저 대비
      window.navigator.geolocation.getCurrentPosition(
        onSuccess,
        retryErrorCallback,
        adjustedCoarseOptions
      );
    });
};

/**
 * 지오로케이션 에러 코드에 따른 토스트 메시지 표시 헬퍼 (인앱 브라우저 대응 강화)
 */
export const handleGeolocationError = (
  error: GeolocationPositionError
): void => {
  console.error("Geolocation error details:", {
    code: error.code,
    message: error.message,
    browserInfo: detectInAppBrowser(),
  });

  const browserInfo = detectInAppBrowser();

  // 인앱 브라우저에서 위치 서비스 제약이 있는 경우 간단한 에러 처리
  if (browserInfo.hasLocationRestrictions) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        toast.error(
          `${browserInfo.browserType} 앱에서는 위치 서비스가 제한됩니다.`
        );
        break;
      case error.POSITION_UNAVAILABLE:
        toast.error("현재 위치를 찾을 수 없습니다.");
        break;
      case error.TIMEOUT:
        toast.error("위치 요청 시간이 초과되었습니다.");
        break;
      default:
        toast.error("위치 서비스 오류가 발생했습니다.");
    }
    return;
  }

  // 일반 브라우저에서의 기본 에러 처리
  switch (error.code) {
    case error.PERMISSION_DENIED:
      toast.error("위치 권한이 거부되었습니다.");
      break;
    case error.POSITION_UNAVAILABLE:
      toast.error("현재 위치를 찾을 수 없습니다.");
      break;
    case error.TIMEOUT:
      toast.error("위치 요청 시간이 초과되었습니다.");
      break;
    default:
      toast.error("위치 서비스 오류가 발생했습니다.");
  }
};
