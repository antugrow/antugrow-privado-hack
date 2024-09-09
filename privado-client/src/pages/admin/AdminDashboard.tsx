import IssueBadgeModal from "@/components/modals/IssueBadgeModal";
import { swrFetcher } from "@/lib/api-client";
import { IApiEndpoint } from "@/types/Api";
import { IUser } from "@/types/User";
import { getInitials } from "@/utils";
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Chip, Divider, Tab, Tabs } from "@nextui-org/react";
import { format } from "date-fns";
import useSWR from "swr";

const AdminDashboard = () => {
	const { data: farmers } = useSWR<IUser[]>([IApiEndpoint.FARMERS], swrFetcher, { keepPreviousData: true });
	const { data: creds } = useSWR<{ title: string; issuedTo: IUser; credential: object; _id: string; createdAt: string }[]>([IApiEndpoint.GET_ALL_CREDS], swrFetcher, { keepPreviousData: true });
	return (
		<>
			<Tabs aria-label="Options">
				<Tab key="home" title="Dashboard">
					<div className="grid grid-cols-2 gap-2">
						<Card>
							<CardHeader>Farmers</CardHeader>
							<CardBody>45</CardBody>
						</Card>
						<Card>
							<CardHeader>Badges Issued</CardHeader>
							<CardBody>6</CardBody>
						</Card>
						<Card>
							<CardHeader>Animals</CardHeader>
							<CardBody>6</CardBody>
						</Card>
					</div>
				</Tab>
				<Tab key="farmers" title="Farmers">
					<div className="flex items-center w-full justify-between mb-4">
						<h2 className="font-bold text-lg">Farmers Onboarded</h2>
					</div>
					{farmers &&
						farmers?.length &&
						farmers?.map((item) => (
							<Card key={item._id}>
								<CardHeader>
									<div className="flex items-center justify-center w-full">
										<Avatar size="lg" getInitials={getInitials} showFallback src="https://images.unsplash.com/broken" name="Jane Kilimo" />
									</div>
								</CardHeader>
								<CardBody className="space-y-2">
									<div className="flex items-center justify-between">
										<h3 className="font-bold text-sm">Name</h3>
										<p className="text-sm">{item?.name}</p>
									</div>
									<div className="flex items-center justify-between">
										<h3 className="font-bold text-sm">Onboarded On</h3>
										<p className="text-sm">{format(item.createdAt, "PPP")}</p>
									</div>
									<div className="flex items-center justify-between">
										<h3 className="font-bold text-sm">No. of Animals</h3>
										<p className="text-sm">4</p>
									</div>
									<div className="flex items-center justify-between">
										<h3 className="font-bold text-sm">Badges</h3>
										<p className="text-sm">2</p>
									</div>
								</CardBody>
							</Card>
						))}
				</Tab>
				<Tab key="badges" title="Badges Issued">
					<div className="flex items-center justify-between w-full mb-4">
						<h2 className="font-bold text-lg">Badges Issued</h2>
						<IssueBadgeModal />
					</div>
					{creds &&
						creds?.length &&
						creds?.map((item) => (
							<Card key={item?._id}>
								<CardHeader>{item?.title}</CardHeader>
								<Divider />
								<CardBody className="space-y-3">
									<div className="flex items-center justify-between">
										<p className="font-semibold">Farmer</p>
										<p>{item?.issuedTo?.name}</p>
									</div>
									<p className="font-semibold">Badge Issued for:</p>
									<div className="flex items-center gap-2 mt-2">
										<Chip size="sm">Farm Registration</Chip>
										<Chip size="sm">Bio Security</Chip>
										<Chip size="sm">Waste Management</Chip>
									</div>
								</CardBody>
								<Divider />
								<CardFooter>
									<p className="italic text-sm">Issued on {format(item?.createdAt, "PPP")}</p>
								</CardFooter>
							</Card>
						))}
				</Tab>
				<Tab key="funding" title="Funding Requests">
					<div className="flex items-center justify-between w-full mb-4">
						<h2 className="font-bold text-lg">Funding Requested</h2>
					</div>
					<Card>
						<CardHeader>Funding Request #1</CardHeader>
						<Divider />
						<CardBody className="space-y-3">
							<div className="flex items-center justify-between">
								<p>Reason for Funding:</p>
								<p className="text-sm text-gray-600">For Buying animal feeds</p>
							</div>
							<div className="flex items-center justify-between">
								<h1 className="font-bold">
									Amount: <span className="font-normal">Ksh 500</span>
								</h1>
								<Chip size="sm" color="primary">
									Approved
								</Chip>
							</div>
						</CardBody>
						<Divider />
						<CardFooter>
							<div className="flex items-center justify-between w-full">
								<p className="italic text-sm">Requested on 9th Sep, 2024</p>
								<Button size="sm" color="primary">
									Approve
								</Button>
							</div>
						</CardFooter>
					</Card>
				</Tab>
			</Tabs>
		</>
	);
};

export default AdminDashboard;
