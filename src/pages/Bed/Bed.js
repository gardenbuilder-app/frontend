import React from "react"
import { gql, useQuery } from "@apollo/client"
import apolloClient from '../../ApolloClient'
import { Button } from 'components'
import { SINGLE_BED_QUERY } from "queries"
import { useUrlHash } from "hooks"
import { BedBuilder } from "./BedBuilder"

export function Bed() {
  const id = Object.keys(useUrlHash())[0]
  console.log(id)

  const { data, loading, error } = useQuery(SINGLE_BED_QUERY, {
    variables: { id: parseInt(id) },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error.message}</p>
  const { bed } = data

  return (
    <>
      <h2>Bed {`${id}`}</h2>
      <BedBuilder
        length={bed.length}
        width={bed.width}
        unit={bed.unitOfMeasurement}
      />
      <Button
        name="submit"
        text="Submit"
      />

    </>
  )
}

function getBedFromCache(bedId) {
  return apolloClient.readFragment({
    id: `Bed:${bedId}`,
    fragment: gql`
      fragment MyBed on Bed {
        id
      }
    `,
  })
}
