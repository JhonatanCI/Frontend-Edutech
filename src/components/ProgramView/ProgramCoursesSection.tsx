interface ProgramCoursesSectionProps {
    programCourses: any,
    semesters: number
}

const ProgramCoursesSection: React.FC<ProgramCoursesSectionProps> = ({programCourses, semesters}) => {
    console.log(programCourses)
    console.log(semesters)
    
    return(
        <div>
            
        </div>
    )
}

export default ProgramCoursesSection