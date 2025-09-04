interface IFormateAddressProps {
  region1: string | null | undefined
  region2: string | null | undefined
  region3: string | null | undefined
}

function formateAddress({ region1, region2, region3 }: IFormateAddressProps) {
  if (!region1) return null

  const address = [region1, region2, region3]
    .filter((region) => region && region !== 'undefined')
    .join(' ')

  return address
}

export { formateAddress }
