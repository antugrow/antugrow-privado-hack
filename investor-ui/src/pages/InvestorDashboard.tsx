import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LineChart, BarChart, PieChart, Line, Bar, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { AlertCircle, Copy, RefreshCw, LogOut } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const overviewData = [
	{ month: "Jan", value: 200000 },
	{ month: "Feb", value: 210000 },
	{ month: "Mar", value: 225000 },
	{ month: "Apr", value: 235000 },
	{ month: "May", value: 245000 },
	{ month: "Jun", value: 250000 },
];

const portfolioData = [
	{ name: "Dairy Farms", value: 100000 },
	{ name: "Poultry Farms", value: 75000 },
	{ name: "Pig Farms", value: 75000 },
];

const loanPerformanceData = [
	{ month: "Jan", disbursed: 30, repaid: 28 },
	{ month: "Feb", disbursed: 35, repaid: 33 },
	{ month: "Mar", disbursed: 40, repaid: 38 },
	{ month: "Apr", disbursed: 50, repaid: 47 },
	{ month: "May", disbursed: 45, repaid: 43 },
	{ month: "Jun", disbursed: 50, repaid: 48 },
];

const OverviewTab = () => (
	<div className="space-y-6">
		<div className="grid grid-cols-3 gap-4">
			<Card>
				<CardHeader>
					<CardTitle>Total Invested</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-2xl font-bold">$250,000</p>
					<p className="text-green-600">+15% from last month</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Current Returns</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-2xl font-bold">$37,500</p>
					<p className="text-green-600">15% APY</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Active Loans</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-2xl font-bold">78</p>
					<p>Across 3 farm categories</p>
				</CardContent>
			</Card>
		</div>
		<Card>
			<CardHeader>
				<CardTitle>Investment Overview</CardTitle>
			</CardHeader>
			<CardContent>
				<ResponsiveContainer width="100%" height={300}>
					<LineChart data={overviewData}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="month" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Line type="monotone" dataKey="value" stroke="#8884d8" name="Total Investment Value ($)" />
					</LineChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	</div>
);

const DepositTab = () => {
	const [selectedCrypto, setSelectedCrypto] = useState("BTC");
	const [depositAddress, setDepositAddress] = useState("0x1234...5678");

	const copyAddress = () => {
		navigator.clipboard.writeText(depositAddress);
		alert("Deposit address copied to clipboard");
	};

	return (
		<div className="space-y-6">
			<Alert variant="destructive">
				<AlertCircle className="h-4 w-4" />
				<AlertTitle>Security Notice</AlertTitle>
				<AlertDescription>Always verify the deposit address. We never change our deposit address via email or phone.</AlertDescription>
			</Alert>
			<Card>
				<CardHeader>
					<CardTitle>Deposit Crypto</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<div>
							<label className="block mb-2">Select cryptocurrency:</label>
							<Select value={selectedCrypto} onValueChange={setSelectedCrypto}>
								<option value="BTC">Bitcoin (BTC)</option>
								<option value="ETH">Ethereum (ETH)</option>
								<option value="USDC">USD Coin (USDC)</option>
							</Select>
						</div>
						<div>
							<label className="block mb-2">Deposit address:</label>
							<div className="flex">
								<Input value={depositAddress} readOnly />
								<Button onClick={copyAddress} className="ml-2">
									<Copy className="mr-2 h-4 w-4" /> Copy
								</Button>
							</div>
						</div>
						<p>Minimum deposit: $1,000 equivalent</p>
						<p>Expected processing time: 30 minutes (6 confirmations)</p>
					</div>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Recent Transactions</CardTitle>
				</CardHeader>
				<CardContent>
					<ul>
						<li>Deposit: 0.5 BTC - Confirmed</li>
						<li>Deposit: 1000 USDC - Pending (3/6 confirmations)</li>
					</ul>
				</CardContent>
			</Card>
		</div>
	);
};

const PortfolioTab = () => (
	<div className="space-y-6">
		<Card>
			<CardHeader>
				<CardTitle>Portfolio Allocation</CardTitle>
			</CardHeader>
			<CardContent>
				<ResponsiveContainer width="100%" height={300}>
					<PieChart>
						<Pie dataKey="value" data={portfolioData} fill="#8884d8" label />
						<Tooltip />
					</PieChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
		<Card>
			<CardHeader>
				<CardTitle>Active Investments</CardTitle>
			</CardHeader>
			<CardContent>
				<table className="w-full">
					<thead>
						<tr>
							<th>Farm Category</th>
							<th>Amount Invested</th>
							<th>Expected Return</th>
							<th>Duration</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Dairy Farms</td>
							<td>$100,000</td>
							<td>16% APY</td>
							<td>12 months</td>
						</tr>
						<tr>
							<td>Poultry Farms</td>
							<td>$75,000</td>
							<td>14% APY</td>
							<td>9 months</td>
						</tr>
						<tr>
							<td>Pig Farms</td>
							<td>$75,000</td>
							<td>15% APY</td>
							<td>6 months</td>
						</tr>
					</tbody>
				</table>
			</CardContent>
		</Card>
		<div className="flex justify-between">
			<Button onClick={() => alert("Reinvestment feature coming soon!")}>
				<RefreshCw className="mr-2 h-4 w-4" /> Reinvest Returns
			</Button>
			<Button variant="outline" onClick={() => alert("Withdrawal feature coming soon!")}>
				<LogOut className="mr-2 h-4 w-4" /> Withdraw Funds
			</Button>
		</div>
	</div>
);

const LoanPerformanceTab = () => (
	<div className="space-y-6">
		<Card>
			<CardHeader>
				<CardTitle>Loan Performance</CardTitle>
			</CardHeader>
			<CardContent>
				<ResponsiveContainer width="100%" height={300}>
					<BarChart data={loanPerformanceData}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="month" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Bar dataKey="disbursed" fill="#8884d8" name="Loans Disbursed" />
						<Bar dataKey="repaid" fill="#82ca9d" name="Loans Repaid" />
					</BarChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
		<Card>
			<CardHeader>
				<CardTitle>Key Metrics</CardTitle>
			</CardHeader>
			<CardContent>
				<p>
					Default Rate: <strong>1.2%</strong>
				</p>
				<p>
					Average Loan Duration: <strong>8 months</strong>
				</p>
				<p>
					Total Loans Funded: <strong>250</strong>
				</p>
			</CardContent>
		</Card>
		<Card>
			<CardHeader>
				<CardTitle>Loan Processing Efficiency</CardTitle>
			</CardHeader>
			<CardContent>
				<p>
					Average time from deposit to loan disbursement: <strong>2 business days</strong>
				</p>
				<p>
					Smart contract automation reduces manual processing by <strong>85%</strong>
				</p>
			</CardContent>
		</Card>
	</div>
);

const InvestorDashboard = () => {
	return (
		<div className="p-6 space-y-6 bg-gray-100">
			<h1 className="text-3xl font-bold text-green-700 mb-4">Antugrow Investor Dashboard</h1>

			<Tabs defaultValue="overview">
				<TabsList>
					<TabsTrigger value="overview">Overview</TabsTrigger>
					<TabsTrigger value="deposit">Deposit</TabsTrigger>
					<TabsTrigger value="portfolio">Portfolio</TabsTrigger>
					<TabsTrigger value="loanPerformance">Loan Performance</TabsTrigger>
				</TabsList>
				<TabsContent value="overview">
					<OverviewTab />
				</TabsContent>
				<TabsContent value="deposit">
					<DepositTab />
				</TabsContent>
				<TabsContent value="portfolio">
					<PortfolioTab />
				</TabsContent>
				<TabsContent value="loanPerformance">
					<LoanPerformanceTab />
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default InvestorDashboard;
