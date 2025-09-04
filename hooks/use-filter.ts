'use client'

import { useState, useCallback, useMemo } from 'react'

interface FilterOption {
  id: string
  label: string
  checked: boolean
}

interface BaseFilterCategory {
  id: string
  label: string
}

type ModalFilterCategory = BaseFilterCategory & {
  type: 'modal'
  options: string[]
}

type CheckboxFilterCategory = BaseFilterCategory & {
  type: 'checkbox'
  options: FilterOption[]
}

type RadioFilterCategory = BaseFilterCategory & {
  type: 'radio'
  options: FilterOption[]
}

type FilterCategory =
  | ModalFilterCategory
  | CheckboxFilterCategory
  | RadioFilterCategory

interface SelectedOption {
  categoryId: string
  optionId: string
  label: string
}

interface InternalFilterCategory {
  id: string
  label: string
  type: 'modal' | 'checkbox' | 'radio'
  options: FilterOption[]
}

interface TResumeFilterState {
  residence: string[] | null
  nationality: string[] | null
  currentVisaType: string[] | null
  preferredVisaType: string[] | null
  education: string[] | null
  gender: string[] | null
  overtime: string[]
  etc: string[]
  updatedAt: Array<string | null>
}

interface TJobPostingFilterState {
  jobPostingType: string[] | null
  residence: string[] | null
  responsibility: string[] | null
  preferredVisaType: string[] | null
  jobType: string[] | null
  jobCategory: string[] | null
  workDays: string[]
  pay: string[] | null
  isVisaSupport: string | null
  etc: string[] | null
}

interface TVisaFilterState {
  region: string[] | null
  supportLanguage: string[] | null
}

function useFilter(initialCategories: FilterCategory[]) {
  const initialInternalCategories = useMemo(
    () =>
      initialCategories.map((category) => ({
        ...category,
        options: (() => {
          if (category.type === 'modal') {
            return category.options.length > 0
              ? category.options.map((option) => ({
                  id: option,
                  label: option,
                  checked: false,
                }))
              : [] // 빈 배열이면 그대로 빈 배열로 초기화
          }

          return category.options
        })(),
      })),
    [initialCategories],
  )

  const [categories, setCategories] = useState<InternalFilterCategory[]>(
    initialInternalCategories,
  )

  /**
   * 카테고리 배열 내의 체크박스와 라디오 버튼의 상태를 업데이트합니다.
   *
   * @param categoryId - 업데이트할 옵션이 포함된 카테고리의 ID
   * @param optionId - 체크 상태를 전환할 옵션의 ID
   *
   * 이 콜백 함수는 세 가지 경우를 처리합니다:
   * 1. 모달 타입 카테고리의 경우:
   *    - 유효한 옵션 ID가 제공된 경우, 이미 존재하지 않는 경우에만 옵션을 추가
   *    - 옵션 ID가 제공되지 않은 경우, 모든 옵션을 제거
   *
   * 2. 라디오 타입 카테고리의 경우:
   *    - 이미 체크된 옵션을 클릭한 경우, 모든 옵션의 체크를 해제
   *    - 그렇지 않은 경우, 다른 모든 옵션의 체크를 해제하고 클릭된 옵션만 체크
   *
   * 3. 체크박스 타입 카테고리의 경우:
   *    - 다른 옵션들의 상태는 유지한 채 클릭된 옵션의 체크 상태만 전환
   *
   * @returns void
   */
  const handleCheckboxChange = useCallback(
    (categoryId: string, optionId: string | undefined) => {
      setCategories((prev) =>
        prev.map((category) => {
          // 현재 카테고리가 아니면 변경하지 않음
          if (category.id !== categoryId) {
            return category
          }

          // 모달 타입은 특별한 처리
          if (category.type === 'modal') {
            // 옵션 ID가 없으면 빈 옵션 목록 반환
            if (!optionId || optionId.trim() === '') {
              return {
                ...category,
                options: [],
              }
            }

            // 이미 존재하는 옵션인지 확인
            const optionExists = category.options.some(
              (option) => option.id === optionId,
            )

            // 이미 존재하는 옵션이면 변경 없음
            if (optionExists) {
              return category
            }

            // 새 옵션을 추가
            return {
              ...category,
              options: [
                ...category.options,
                {
                  id: optionId,
                  label: optionId,
                  checked: true,
                },
              ],
            }
          }

          // radio 타입만 단일 선택으로 처리
          if (category.type === 'radio') {
            const targetOption = category.options.find(
              (option) => option.id === optionId,
            )

            if (targetOption?.checked) {
              return {
                ...category,
                options: category.options.map((option) => ({
                  ...option,
                  checked: false,
                })),
              }
            }

            return {
              ...category,
              options: category.options.map((option) => ({
                ...option,
                checked: option.id === optionId,
              })),
            }
          }

          // checkbox 타입은 다중 선택 가능하도록 처리
          return {
            ...category,
            options: category.options.map((option) => {
              if (option.id === optionId) {
                return { ...option, checked: !option.checked }
              }
              return option
            }),
          }
        }),
      )
    },
    [],
  )

  const getSelectedOptions = useCallback((): SelectedOption[] => {
    return categories.flatMap((category) =>
      category.options
        .filter((option) => option.checked)
        .map((option) => ({
          categoryId: category.id,
          optionId: option.id,
          label: option.label,
        })),
    )
  }, [categories])

  const getSelectedOptionsById = useCallback(
    (categoryId: string) => {
      const targetCategory = categories.find(
        (category) => category.id === categoryId,
      )

      const selectedOptions = targetCategory?.options
        .filter((option) => option.checked)
        .map((option) => option.id)

      return selectedOptions || []
    },
    [categories],
  )

  const getOptionsById = useCallback(
    (categoryId: string) => {
      const targetCategory = categories.find(
        (category) => category.id === categoryId,
      )

      return targetCategory ? targetCategory.options : []
    },
    [categories],
  )

  const getCategoryById = useCallback(
    (categoryId: string) => {
      return categories.find((category) => category.id === categoryId)
    },
    [categories],
  )

  const removeModalOption = useCallback(
    (categoryId: string, optionId: string) => {
      setCategories((prev) =>
        prev.map((category) => {
          if (category.id === categoryId && category.type === 'modal') {
            return {
              ...category,
              options: category.options.filter(
                (option) => option.id !== optionId,
              ),
            }
          }

          return category
        }),
      )
    },
    [],
  )

  const setInitialState = useCallback(
    (
      initialState:
        | TResumeFilterState
        | TJobPostingFilterState
        | TVisaFilterState,
    ) => {
      setCategories((prev) =>
        prev.map((category) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const currentValue = (initialState as Record<string, any>)[
            category.id
          ]

          if (!currentValue) {
            return {
              ...category,
              options: category.options.map((option) => ({
                ...option,
                checked: false,
              })),
            }
          }

          if (category.type === 'modal') {
            // 모달 타입은 배열 데이터를 옵션으로 변환
            if (Array.isArray(currentValue)) {
              // 빈 문자열이나 null/undefined 필터링
              const validValues = currentValue.filter(
                (value): value is string =>
                  !!value && typeof value === 'string',
              )

              return {
                ...category,
                options: validValues.map((value) => ({
                  id: value,
                  label: value,
                  checked: true,
                })),
              }
            }
            // 배열이 아닌 경우 빈 옵션으로 초기화
            return {
              ...category,
              options: [],
            }
          }

          const selectedValues = Array.isArray(currentValue)
            ? currentValue
            : [currentValue]

          return {
            ...category,
            options: category.options.map((option) => ({
              ...option,
              checked: selectedValues.includes(option.id),
            })),
          }
        }),
      )
    },
    [],
  )

  const reset = useCallback(() => {
    setCategories(initialInternalCategories)
  }, [initialInternalCategories])

  return {
    categories,
    handleCheckboxChange,
    getSelectedOptions,
    getSelectedOptionsById,
    getOptionsById,
    getCategoryById,
    removeModalOption,
    setInitialState,
    reset,
  }
}

export type {
  FilterCategory,
  FilterOption,
  SelectedOption,
  InternalFilterCategory,
}
export { useFilter }
