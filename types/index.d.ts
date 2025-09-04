import type kakaomaps from 'kakaomaps'
import type navermaps from 'navermaps'

declare global {
  interface Window {
    naver: typeof navermaps
    Kakao: typeof kakaomaps
  }
}
