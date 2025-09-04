import { FilterAccordion } from './filter-accordion'
import { FilterContainer } from './filter-container'
import { FilterModalTrigger } from './filter-modal-trigger'
import { FilterSummary } from './filter-summary'
import { FilterTitle } from './filter-title'
import { FilterWrapper } from './filter-wrapper'

function Filter() {
  return <div>Filter</div>
}

Filter.Wrapper = FilterWrapper
Filter.Container = FilterContainer
Filter.Title = FilterTitle
Filter.ModalTrigger = FilterModalTrigger
Filter.Accordion = FilterAccordion
Filter.Summary = FilterSummary

export { Filter }
