import { techLists } from "@/assets/TechIcons"
import { projects_content } from "@/content/projects"
import React , { useRef , useCallback } from 'react'
import { IoIosArrowForward } from "react-icons/io"
import Header2 from "../shared/Header2"
import { useAppState } from "@/stores/store"

type props = {
  changeCurrent : (value : string) => void
}

const Projects : React.FC<props> = ({
  changeCurrent
}) => {
  const { language } = useAppState()

  const json = projects_content[language]

  const observer = useRef<IntersectionObserver | null>(null)
  
  const handle =  useCallback((node : HTMLElement) => {

    if(observer.current) observer.current.disconnect()
    
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting){
        changeCurrent && changeCurrent("Projects")
      }
    },{
      rootMargin:(node.offsetHeight / 3) * -1 + "px 0px"
    })

    if(node) observer.current.observe(node)

  },[])

  return (
    <section
    id="Projects"
    ref={handle}
    className={`
    flex
    flex-col
    py-16
    gap-8
    `}>
      <Header2
      text={json.header.text}
      colored_text={json.header.colored}
      color={"text-green-500"}
      />

      {
        json.projects.map(({
          title , 
          description , 
          technologies ,
          image
        }, idx) => {
          return(
            <div
            key={idx}
            className={`
            ${idx % 2 === 0 ? "lg:flex-row-reverse" : "lg:flex-row"}
            flex
            flex-col
            items-center
            justify-between
            gap-8
            relative
            `}>

              <div
              className="
              lg:w-[50%]
              flex
              flex-col
              gap-3
              text-neutral-800
              dark:text-white
              ">
                <h3
                className="
                text-[24px]
                font-medium
                ">
                  {title}
                </h3>

                <p>
                  {description}
                </p>

                <div
                className="
                flex
                gap-2
                font-medium
                ">
                  {technologies.map((item : string , idx) => {
                    let { color , Icon } = techLists[item];
                    
                    return(
                      <span
                      className={`
                      ${color}
                      text-[1.5rem]
                      `}
                      key={idx}
                      >
                        <Icon/>
                      </span>
                    )
                  })}
                </div>

                <div
                className="
                flex
                gap-2
                ">
                  <a
                  className="
                  after:transition-all
                  relative
                  flex
                  gap-1
                  w-fit
                  cursor-pointer
                  items-center
                  justify-center
                  after:content-['']
                  after:w-full
                  after:max-w-[0px]
                  hover:after:max-w-full
                  after:h-[2px]
                  after:bg-neutral-800
                  dark:after:bg-white
                  after:absolute
                  after:bottom-0
                  after:left-0
                  ">
                    <span>demo</span>
                    <IoIosArrowForward/>
                  </a>
                </div>

              </div>

              <div
              className={`
              flex
              relative
              lg:w-[50%]
              `}>

                <div
                className={`
                z-[1]
                bg-violet-500
                p-2
                flex
                relative
                `}>
                  <img
                  className={`
                  relative
                  w-[100%]
                  aspect-video
                  object-cover
                  `}
                  src={image}
                  alt={title}
                  />
                </div>

                <span
                className={`
                z-[0]
                absolute
                w-full
                h-full
                bg-violet-600
                bottom-[-6px]
                right-[-6px]
                `}
                />

              </div>

            </div>
          )
        })
      }

    </section>
  )
}

export default Projects