import { Link } from "react-router-dom";

export default function Banner() {
	return (
		<section>
			<div className="hero bg-base-200 shadow-xl rounded-lg mt-5 px-5">
				<div className="hero-content flex-col lg:flex-row-reverse">
					<img
						src="/images/banner-3.webp"
						className="lg:max-w-xl md:max-w-lg rounded-lg shadow-2xl"
					/>
					<div className="space-y-10">
                        <div>
                            <div className="text-2xl font-semibold">
                                Let&apos;s update yourself with latest technology with...<br />
                            </div>
                            <div className="mt-5 text-4xl font-bold text-slate-700">
								Code Course Academy
							</div>
                        </div>
						<div>
                            <Link><a className="btn btn-neutral">Enroll</a></Link>
                        </div>
					</div>
				</div>
			</div>

            {/* This immediate following code has problem of z indexing with drop dwon menu */}
			{/* <div className="shadow-xl mt-5 relative before:absolute before:w-full before:h-full before:inset-0 before:bg-black before:opacity-50 before:z-10">
				<img
					src="/images/banner-3.webp"
					alt="Banner Image"
					className="absolute inset-0 w-full h-full object-cover"
				/>

				<div className="min-h-[350px] relative z-50 h-full max-w-6xl mx-auto flex flex-col justify-center items-center text-center text-white p-6">
					<h2 className="sm:text-4xl text-2xl font-bold mb-6">
                        Code Course Academy
					</h2>
					<p className="sm:text-lg text-base text-center text-gray-200">
                        Let&apos;s update yourself with latest technology today!
					</p>

					<button
						type="button"
						className="mt-12 bg-transparent text-white text-base py-3 px-6 border border-white rounded-lg hover:bg-white hover:text-black transition duration-300"
					>
						Enroll
					</button>
				</div>
			</div> */}

			{/* <div
				className="hero"
				style={{
					backgroundImage:
						"url(/images/banner-3.webp)",
				}}
			>
				<div className="hero-overlay bg-opacity-60"></div>
				<div className="hero-content text-neutral-content text-center">
					<div className="max-w-md">
						<h1 className="mb-5 text-5xl font-bold">Code Course Academy</h1>
						<p className="mb-5">
                        Let&apos;s update yourself with latest technology
						</p>
						<Link><a className="btn btn-neutral">Enroll</a></Link>
					</div>
				</div>
			</div> */}
		</section>
	);
}
