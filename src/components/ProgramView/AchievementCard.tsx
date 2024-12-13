import React from "react"
import { AchivementIcon } from "../../assets/Icons/achivementIcons"
import { Checkbox } from "../../assets/Icons/achivementIcons"
import { useNavigate } from "react-router-dom"

interface AchievementCardProps {
    name: string,
    description: string,
    to: string
}

export const AchievementCard: React.FC<AchievementCardProps> = ({ name, description, to }) => {

    const navigateTo = useNavigate()

    const toRoute = () => {
        navigateTo(to)
    }

    return (
        <div 
            className="flex flex-col relative h-[16rem] bg-white shadow-md rounded-lg border border-gray-200 transition-transform hover:scale-105 cursor-pointer"
            onClick={toRoute}
            >
            <div className="flex items-center justify-center h-full w-full p-10">
                <span>
                    <AchivementIcon />
                </span>
                <div className="pl-8"> {/* Añadimos `relative` aquí */}
                    <div className="absolute top-0 right-0 hover:scale-125"> {/* Posicionamos el checkbox */}
                        <Checkbox />
                    </div>
                    <h3 className="text-black text-2xl font-calsans leading-tight max-w-mdk">
                        {name}
                    </h3>
                    <p className="text-black pt-3">{description}</p>
                </div>
            </div>
        </div>
    )
}