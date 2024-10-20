export default function AboutUs() {
	return (
		<section>
			<div className="mb-5 mt-10">
				<h1
					className="text-center font-semibold text-5xl mb-5"
				>
					About Us
				</h1>
				<hr className="w-3/4 mx-auto" />
			</div>

			<div className="bg-base-200 shadow-xl rounded-lg ">
				<section className="py-24 relative">
					<div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
						<div className="w-full justify-start items-center gap-8 grid lg:grid-cols-2 grid-cols-1">
							<div className="w-full flex-col justify-start lg:items-start items-center gap-10 inline-flex">
								<div className="w-full flex-col justify-start lg:items-start items-center gap-4 flex">
									<h2 className="text-gray-900 text-4xl font-bold font-manrope leading-normal lg:text-start text-center">
										Mr. Alex Duke
									</h2>
									<h4 className="text-gray-900 text-2xl font-semibold font-manrope leading-normal lg:text-start text-center">
										Product Owner & Project Architect
									</h4>
									<p className="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-center">
										Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum porro ipsum tempore consequatur sapiente unde sit earum recusandae fugiat quod!
									</p>
								</div>
								<button className="btn btn-neutral sm:w-fit w-full px-3.5 py-2 justify-center items-center flex">
									<span className="px-1.5 text-white text-sm font-medium leading-6">
										Connect
									</span>
								</button>
							</div>
							<img
								className="lg:mx-0 mx-auto h-full rounded-3xl object-cover"
								src="https://pagedone.io/asset/uploads/1717751272.png"
								alt="about Us image"
							/>
						</div>
					</div>
				</section>
			</div>
		</section>
	);
}
