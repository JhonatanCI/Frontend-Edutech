import HabilitiesBarChart from "./HabilitiesBarChart"

export const HabilitiesDev = () => {
    const chartvalues = {
        categories: [
            'Innovación',
            'User Experience',
            'Development',
            'Marketing',
            'Integrador',
            'Inglés',
            'Ética',
            'Integración Estratégica',
          ],
        max: 10
    }


    return (
        <div className="pt-28 w-2/5">
            <h2 className="text-black text-2xl font-calsans leading-tight">
                Perfil de desarrollo de habilidades
            </h2>
            <span className="text-black w-3/5 mb-6">
                Para poder realizar los intercambios ten en cuenta el perfil que establecemos como base de nuestros programas.
                Desde aquí podrás empezar a construir tu propia maestría.
            </span>
            <HabilitiesBarChart chartvalues={chartvalues}/>
        </div>
    )
}