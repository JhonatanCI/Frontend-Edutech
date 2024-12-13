import React, { useRef } from "react"
import { Program } from "../../model/types"
import { useScrollPrograms } from "../../hooks/useScrollPrograms"
import ProgramCard from "../Home/ProgramCard"

interface ProgramsScrollSectionProps {
    programs: Program[]
}

export const ProgramsScrollSection: React.FC<ProgramsScrollSectionProps> = ({ programs }) => {

    const containerRef = useRef<HTMLDivElement>(null);
    const { isAtStart, isAtEnd } = useScrollPrograms(containerRef);

    const handleScrollLeft = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const handleScrollRight = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };


    return (
        <div className="bg-white flex flex-col items-end">
            <div className='flex justify-center gap-8 items-end'>
                <button onClick={handleScrollLeft} disabled={isAtStart}>
                    <svg width="37" height="30" viewBox="0 0 37 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.585785 13.5858C-0.195263 14.3668 -0.195263 15.6332 0.585785 16.4142L13.3137 29.1421C14.0948 29.9232 15.3611 29.9232 16.1421 29.1421C16.9232 28.3611 16.9232 27.0948 16.1421 26.3137L4.82843 15L16.1421 3.68629C16.9232 2.90524 16.9232 1.63891 16.1421 0.857864C15.3611 0.0768156 14.0948 0.0768156 13.3137 0.857864L0.585785 13.5858ZM37 13H2V17H37V13Z"
                            fill={isAtStart ? "#A7A5A5" : "#080808"}
                        />
                    </svg>
                </button>

                <button onClick={handleScrollRight} disabled={isAtEnd}>
                    <svg width="37" height="30" viewBox="0 0 37 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M36.4142 16.4142C37.1953 15.6332 37.1953 14.3668 36.4142 13.5858L23.6863 0.857864C22.9052 0.0768156 21.6389 0.0768156 20.8579 0.857864C20.0768 1.63891 20.0768 2.90524 20.8579 3.68629L32.1716 15L20.8579 26.3137C20.0768 27.0948 20.0768 28.3611 20.8579 29.1421C21.6389 29.9232 22.9052 29.9232 23.6863 29.1421L36.4142 16.4142ZM0 17H35V13H0V17Z"
                            fill={isAtEnd ? "#A7A5A5" : "#080808"} />
                    </svg>
                </button>
            </div>

            {/* Cards Scroll Nav */}
            <div className="flex overflow-x-auto scroll-invisible py-10 gap-8 items-center max-w-full" ref={containerRef}>
                <div className="flex gap-8">
                    {programs.map(program =>
                        <ProgramCard key={program.id}
                            image={program.image}
                            title={program.name}
                            description={program.description}
                            buttonText="Saber más"
                            path={`/program/${program.name}`}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}