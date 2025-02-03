import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getResult } from "../features/results/resultSlice";
import { 
  ClipboardList, 
  Trash2, 
  FileText, 
  PlusCircle,
  Clock,
  BookOpen,
  Trophy,
  TestTube2,
  PencilRuler,
  FileCog,
  GraduationCap,
  Star,
  FileEdit
} from "lucide-react";

function CardComponentResult({ id, name, buttonText, buttonType, duration, totalMarks }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleTest = () => {
    if (buttonText === "Take Test" || buttonText === "Delete Test") {
      navigate(`/tests/${id}`);
    } else if (buttonText === "View Result") {
      dispatch(getResult(id));
      navigate(`/results/${id}`);
    } else if (buttonText === "Create Test") {
      navigate(`/tests/createTest`);
    }
  };

  // Icon selection for different actions
  const cardIcons = {
    "Take Test": { icon: <TestTube2 className="w-12 h-12" />, color: "bg-blue-100 text-blue-600" },
    "Delete Test": { icon: <Trash2 className="w-12 h-12" />, color: "bg-red-100 text-red-600" },
    "View Result": { icon: <Trophy className="w-12 h-12" />, color: "bg-green-100 text-green-600" },
    "Create Test": { icon: <PlusCircle className="w-12 h-12" />, color: "bg-purple-100 text-purple-600" }
  };

  // Test category icons (adds variety)
  const testCategoryIcons = [<GraduationCap />, <Star />];
  const randomCategoryIcon = testCategoryIcons[Math.floor(Math.random() * testCategoryIcons.length)];
  const colors = [ "bg-yellow-100 text-yellow-600"];
  const randomCategoryIconColour = colors[Math.floor(Math.random() * colors.length)];

  // Button icons
  const buttonIcons = {
    "Take Test": <ClipboardList className="w-5 h-5 mr-2" />, 
    "Delete Test": <Trash2 className="w-5 h-5 mr-2" />, 
    "View Result": <FileText className="w-5 h-5 mr-2" />, 
    "Create Test": <PlusCircle className="w-5 h-5 mr-2" />, 
  };

  return (
    <div className="m-3  bg-white shadow-gray-300  text-xs border-0 shadow-lg rounded-xl flex flex-col  transition-all hover:shadow-xl hover:scale-101">
      {/* Centered Image/Icon */}
      <div className=" max-w-full max-h-full flex m-2 items-center justify-center">
        <div className={`${randomCategoryIconColour}   p-10 w-full h-full flex items-center justify-center rounded-xl`}>
          {randomCategoryIcon}
        </div>
      </div>


   

      {/* Test Details */}
      <div className="p-5 flex flex-col items-center justify-center">
      <h3 className="text-lg font-medium text-black mb-2 text-center">{name}</h3>

      

{/* Action Button */}
<button
  type="button"
  className={`mt-2 px-6 py-2  flex items-center font-medium border-1 border-[#7b1481] hover:bg-[#7b1481] hover:text-white  ${buttonType} hover:${buttonType}-dark`}
  onClick={handleTest}
>
  {buttonIcons[buttonText]}
  {buttonText}
</button>
      </div>
    </div>
  );
}

export default CardComponentResult;
