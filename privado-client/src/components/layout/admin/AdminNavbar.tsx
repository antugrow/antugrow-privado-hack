import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, User as UserProfile } from "@nextui-org/react";
import AcmeLogo from "../AcmeLogo";
import { getInitials } from "@/utils";
import { useAuthStore } from "@/hooks/store/useAuthStore";
import { useNavigate } from "react-router-dom";

export default function AdminNavbar() {
	const { logout } = useAuthStore();
	const navigate = useNavigate();

	const signOut = () => {
		logout();
		navigate("/auth/signin");
	};
	return (
		<Navbar>
			<NavbarContent>
				<NavbarBrand>
					<AcmeLogo />
					<p className="font-bold text-inherit">Antugrow</p>
				</NavbarBrand>
			</NavbarContent>
			<NavbarContent>
				<Button size="sm" color="primary" onPress={signOut}>
					Logout
				</Button>
			</NavbarContent>
			<NavbarContent justify="end">
				<NavbarItem>
					<UserProfile
						name="Jane Kilimo"
						description="Murang'a"
						avatarProps={{
							showFallback: true,
							name: "Jane Kilimo",
							getInitials: getInitials,
						}}
					/>
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
}
