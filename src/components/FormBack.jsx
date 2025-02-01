import React from 'react';

function FormBack({ heading, img, form }) {
	return (
		<div className="  text-center min-h-screen">
			<div className="flex flex-col md:flex-row w-full">
				<div className="  md:w-6/12 w-full px-4 items-center ">
					<h1 className="text-3xl font-extrabold tracking-wide text-[#7b1481] mt-20  font-serif">
						Test Board	
					</h1>
					<p className="text-center text-[13px] m-2  md:w-1/2 font-serif  mx-auto">
						Your Smart Solution for Efficient, Accurate, and Instant Test Preparation. Explore now
					</p>
					
					
					{form}
				</div>
				
				<div className="hidden md:flex md:w-5/12 justify-center">
					<img src={img} alt="Login Logo" className="mt-10  w-full h-auto" />
				</div>
			</div>
		</div>
	);
}

export default FormBack;
