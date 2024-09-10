import WalletConnection from "@/components/web3/WalletConnection";
import HomeLayout from "@/layouts/HomeLayout";

const Home = () => {
	return (
		<HomeLayout>
			<section className="mt-24 mx-auto max-w-screen-xl pb-4 px-4 sm:px-8">
				<div className="text-center space-y-4">
					<h1 className="text-gray-800 font-bold text-4xl md:text-5xl">
						Optimize your website for
						<span className="text-indigo-600"> Search engine</span>
					</h1>
					<p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
						It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum
					</p>
				</div>
				<div className="mt-12 justify-center items-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex">
					<WalletConnection />
				</div>
			</section>
		</HomeLayout>
	);
};

export default Home;
