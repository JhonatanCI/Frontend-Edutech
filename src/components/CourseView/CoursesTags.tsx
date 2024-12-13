interface CoursesTagsProps {
    tags: string[];
  }
  
  const CoursesTags: React.FC<CoursesTagsProps> = ({ tags }) => {
    return (
      <div className="flex flex-col mt-2">
        <p className="text-gray-500 text-sm font-light font-inter">
          Habilidades que desarrollarás
        </p>
        <div className="flex justify-left mt-3 gap-2">
          {tags.map((tag, index) => (
            <button
              key={index}
              className="bg-primaryBlue text-white font-medium text-xs font-inter px-6 py-2 rounded-2xl hover:bg-primaryBlue-dark"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
  
    );
  };
  
  export default CoursesTags;