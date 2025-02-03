import { jellyTriangle } from 'ldrs'
jellyTriangle.register()
function Spinner({child}) {
  if(!child){
    child = 
    <l-jelly-triangle
      size="40"
      speed="1.75" 
      color="black" 
    ></l-jelly-triangle>
  }
  return (
    <div className="loadingSpinnerContainer">
     {child}
    </div>
  );
}

export default Spinner;