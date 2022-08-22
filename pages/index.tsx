import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styled from 'styled-components'
import React, { useEffect, useState } from 'react'

type Props = {
  doodles: any
  references: any
}

type Reference = {
  id: number | string
  attributes: {
    InUse: boolean
    ReferenceId: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    PrimaryImage: {
      id: number | string
      data: {
        attributes: {
          name: string
        }
      }
    }
  }
}

type Image = {
  data: {
    id: string | number
    attributes: {
      alternativeText: string
      caption: string
      createdAt: string
      ext: string
      formats: {
        large?: ImageFormat
        medium?: ImageFormat
        small?: ImageFormat
        thumbnail?: ImageFormat
      }
      hash: string
      height: number
      mime: string
      name: string
      previewUrl: null
      provider: string
      provider_metadata: null
      size: number
      updatedAt: string
      url: string
      width: number
    }
  }
}

type ImageFormat = {
  ext: string
  hash: string
  height: number
  mime: string
  name: string
  path: null
  size: number
  url: string
  width: number
}

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
gap: 15px;
`

const Home = (props: Props) => {
  const { doodles, references } = props
  const [image, setImage] = useState<string | null>(null)

  const getRandomIntInclusive = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }
  
  useEffect(()=> {
    setTimeout(() => {
    })
  }, [])

  return (
    <Container>
      {references.map((r: any) => {
        console.log("r.attributes.PrimaryImage.data.attributes.url: ", r.attributes.PrimaryImage.data.attributes.url)
        return (
      // <div>Reference Image Here</div>
      <Image key={`${r.id}`} src={`http://localhost:1337${r.attributes.PrimaryImage.data.attributes.url}`} alt="no image" width={r.attributes.PrimaryImage.data.attributes.width} height={r.attributes.PrimaryImage.data.attributes.height} />
      )})}
      {/* { doodles.map(() => {
        return (
          <div key={doodle.}>
            Doodle
            </div>
        )
      })} */}
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const doodleResult = await fetch('http://localhost:1337/api/doodles?populate=*')
  const doodles = await doodleResult.json()
  const referenceResult = await fetch('http://localhost:1337/api/references?populate=*')
  const references = await referenceResult.json()
  return {props: { doodles: doodles.data, references: references.data }}
}

export default Home