"use client"

import Crown from '@/svg/Crown'
import Question from '@/svg/Question'
import React , { useRef , useCallback } from 'react'
import { motion } from "framer-motion"
import Header2 from '../shared/Header2'

type props = {
  changeCurrent : (value : string) => void
}

const AboutMe : React.FC<props> = ({
  changeCurrent
}) => {
  const observer = useRef<IntersectionObserver | null>(null)
  
  const handle =  useCallback((node : HTMLElement) => {

    if(observer.current) observer.current.disconnect()
    
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting){
        changeCurrent && changeCurrent("About me")
      }
    },{
      rootMargin: (node.offsetHeight / 2.5) * -1 + "px 0px"
    })

    if(node) observer.current.observe(node)

  },[])

  return (
    <section
    ref={handle}
    className={`
    flex
    lg:flex-row
    flex-col-reverse
    py-16
    lg:items-start
    items-center
    gap-y-8
    `}>

        <motion.div
        initial={{
          y : -60,
          opacity : 0
        }}
        whileInView={{
          y : 0,
          opacity : 1
        }}
        viewport={{
          once : true,
          margin : "0px 0px -50% 0px"
        }}
        className='
        relative
        '>
  
          <Question
          className='
          lg:w-[30vw]
          w-[50vw]
          aspect-square
          '
          backdropColor="fill-neutral-900"
          color="fill-neutral-800"
          />

          <Question
          className='
          absolute
          w-[20%]
          top-[55%]
          left-[10%]
          rotate-[-18deg]
          aspect-square
          '
          backdropColor="fill-yellow-600"
          color="fill-yellow-400"
          />

          <Question
          className='
          absolute
          w-[22%]
          top-[50%]
          right-[10%]
          rotate-[15deg]
          aspect-square
          '
          backdropColor="fill-cyan-600"
          color="fill-cyan-500"
          />

        </motion.div>

        <div
        className='
        flex
        flex-col
        gap-3
        '>
            <Header2
            text='Who is MmD?'
            color='text-cyan-500'
            colored_text='MmD?'
            />
            
            <p>
                My name is Mohammad Jamali and I was born on July 6 of 2004, in Tabriz, a city in South Azerbaijan. I am a highly motivated and passionate self-taught front-end developer with experience building websites and web applications using frameworks such as React, Preact, and Next.
            </p>

            <p>
                Additionally, I am a self-taught polyglot who speaks English, Turkish, Azeri, and Persian fluently. 
            </p>

            <p>
              here are few technologies I've worked with recently:
            </p>
            
            <div
            className={`
            grid
            place-items-start
            gap-2
            grid-cols-[repeat(auto-fill,_minmax(120px,_1fr))]
            `}>

              {technologies.map((item , idx) => {
                return(
                  <motion.span
                  key={idx}
                  transition={{
                    delay : ((idx + 1) * .05)
                  }}
                  initial={{
                    y : -30,
                    opacity : 0,
                  }}
                  whileInView={{
                    y : 0,
                    opacity : 1
                  }}
                  viewport={{
                    once : true,
                    margin : "0px 0px -25% 0px"
                  }}
                  className={`
                  flex 
                  items-center
                  justify-center
                  gap-2
                  `}>
                    <Crown
                    className='
                    w-[30px]
                    aspect-square
                    '
                    color="fill-neutral-700"
                    backdropColor="fill-neutral-800"
                    />

                    <span>
                      {item}
                    </span>

                  </motion.span>
                )
              })}

            </div>

        </div>

    </section>
  )
}

export default AboutMe

const technologies = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next",
  "Tailwind",
  "Node",
]