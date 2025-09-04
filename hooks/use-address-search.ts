import axios from 'axios'
import { useEffect, useState } from 'react'

export interface AddressResponse {
  data: {
    documents: Document[] | []
    meta: Meta
  }
}

interface Document {
  address: Address | null
  address_name: string
  address_type: string
  road_address: RoadAddress | null
  x?: string
  y?: string
}

interface Address {
  address_name: string
  b_code?: string
  h_code?: string
  main_address_no?: string
  mountain_yn?: string
  region_1depth_name?: string
  region_2depth_name?: string
  region_3depth_h_name?: string
  region_3depth_name?: string
  sub_address_no?: string
  x?: string
  y?: string
}

interface RoadAddress {
  address_name?: string
  building_name?: string
  main_building_no?: string
  region_1depth_name?: string
  region_2depth_name?: string
  region_3depth_name?: string
  road_name?: string
  sub_building_no?: string
  underground_yn?: string
  x?: string
  y?: string
  zone_no?: string
}

interface Meta {
  is_end: boolean
  pageable_count: number
  total_count: number
}

interface ProcessedAddress {
  addressName: string
  region1?: string
  region2?: string
  region3?: string
  fullAddress?: string
}

function useAddressSearch({ searchText }: { searchText: string }) {
  const [addressData, setAddressData] = useState<ProcessedAddress[]>([])

  useEffect(() => {
    const fetchAddresses = async () => {
      if (!searchText) {
        setAddressData([])
        return
      }

      try {
        const response: AddressResponse = await axios(
          `${process.env.NEXT_PUBLIC_KAKAO_ADDRESS_SEARCH_URL}${searchText}&analyze_type=exact`,
          {
            headers: {
              Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
            },
          },
        )

        setAddressData(
          response.data.documents?.map((doc) => ({
            addressName: doc.address_name,
            region1:
              doc.address?.region_1depth_name ||
              doc.road_address?.region_1depth_name,
            region2:
              doc.address?.region_2depth_name ||
              doc.road_address?.region_2depth_name,
            region3:
              doc.address?.region_3depth_name ||
              doc.road_address?.region_3depth_name,
            fullAddress: doc.address_name || doc.road_address?.address_name,
          })) || [],
        )
      } catch (error) {
        console.error('Failed to fetch addresses:', error)
        setAddressData([])
      }
    }

    fetchAddresses()
  }, [searchText])

  return addressData
}

export { useAddressSearch }
