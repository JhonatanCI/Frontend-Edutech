import React, {useState} from 'react';
import { useDebounce } from 'react-use';

import { getResults } from '../../services/search';
import { useTalentDevContext } from '../../hooks/useTalentDevContext';
import { useDispatch } from 'react-redux';
import { addTag } from '../../redux/tagsSlice';


const TalentSearchBar: React.FC = () => {

  const dispatch = useDispatch();
  const { updateItems, reset } = useTalentDevContext();

  const [val, setVal] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');
  const [currentWorld, setCurrentWorld] = useState<string | null>(null)

  useDebounce(
    () => {
      const fetchData = async () => {
        if(debouncedValue !== ""){
          try {
            setCurrentWorld(debouncedValue)
            const data = await getResults(debouncedValue);
            updateItems(data)
            
          } catch (error) {
            console.error("No se pudo realizar la consulta")
          }
        } else {
          reset()
          setCurrentWorld(null)
        }
      };
      fetchData();
    },
    800,
    [debouncedValue]
  );

  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setVal(value);
    setDebouncedValue(value);
  };

  const handleClick = () => {
    if(currentWorld !== null){
      const words = JSON.parse(localStorage.getItem("recentSearches") || "[]");
      words.push(currentWorld);
      localStorage.setItem("recentSearches", JSON.stringify(words));

      dispatch(addTag(currentWorld))
    }
  }

  return (
    <div className="flex mt-6 w-full">
      <input
        value={val}
        onChange={handleChange}
        type="text"
        placeholder="Buscar mundos (e.j Negocios, Liderazgo)"
        className="flex-grow bg-white font-inter text-sm text-textGray px-4 py-2 h-[3rem] rounded-l-sm border border-gray-300 focus:outline-none focus:ring-0"
      />
      <button 
        className="bg-primaryBlue text-white px-4 py-2  rounded-r-sm hover:bg-primaryBlue-dark h-12"
        onClick={handleClick}
      >
        <svg width="23" height="23" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.20363 18.6974C-1.06792 14.4258 -1.06783 7.47533 3.20363 3.20371C7.47528 -1.0679 14.4257 -1.0679 18.6973 3.20371C22.3212 6.82759 22.87 12.2172 20.3453 16.426C20.3453 16.426 20.1639 16.7302 20.4089 16.975C21.8062 18.3722 25.9984 22.5645 25.9984 22.5645C27.111 23.6769 27.3758 25.2326 26.3892 26.2193L26.2193 26.389C25.2327 27.3758 23.677 27.111 22.5645 25.9985C22.5645 25.9985 18.3812 21.8151 16.9867 20.4207C16.7301 20.164 16.4259 20.3454 16.4259 20.3454C12.2172 22.87 6.82754 22.3213 3.20363 18.6974ZM16.6747 16.6747C19.831 13.5184 19.8309 8.38286 16.6746 5.22658C13.5183 2.07038 8.38265 2.07029 5.22643 5.22658C2.07012 8.38277 2.07012 13.5184 5.22643 16.6747C8.38273 19.8308 13.5183 19.8308 16.6747 16.6747Z" fill="white"/>
        </svg>
      </button>
    </div>
  );
};
  
export default TalentSearchBar;