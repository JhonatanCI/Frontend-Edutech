import React from 'react';
import Button from '../Commons/Button';
import HeroTitle from './HeroTitle';
import advImage from "../../assets/AdventureImage.png"

const AdventureSection: React.FC = () => {
    return (
        <section className="flex items-center justify-center px-8 py-12 bg-white">

            <div className="w-1/3 mt-24">
                {/* Left side: Text content */}
                <HeroTitle
                    heading={
                        <>
                            Comienza tu nueva aventura
                        </>
                    }
                    subheading="En EverGrow estamos comprometidos con tu desarrollo y en convertirte en el profesional del futuro.
                                ¿Qué estás esperando?"
                    variant='secondary'
                />
                <div className='w-2/3 pt-8'>
                    <Button href="#" variant="primary" size="medium" >¡Comienza ya!</Button>
                </div>
                
            </div>

            {/* Right side: Image with circular cutout */}
            <div className="flex justify-end">
                <div className=" w-11/12 h-11/12">
                    <img
                        src={advImage}
                        alt="Adventure"
                        className="object-cover w-full h-full "
                    />
                </div>
            </div>
        </section>
    );
};

export default AdventureSection;
