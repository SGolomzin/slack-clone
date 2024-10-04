import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

export const SignInCard = () => {
	return (
		<Card className="w-full h-full p-8">
			<CardHeader className="px-0 pt-0">
				<CardTitle>
					Login to continue
				</CardTitle>
				<CardDescription>
					Use your email or another service to continue
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-5 px-0 pb-0">
				<form className="space-y-2.5">
					<Input
						disabled={false}
						value=""
						onChange={(e) => {}}
						placeholder="Enter your email"
						type="email"
						required
					/>
					<Input
						disabled={false}
						value=""
						onChange={(e) => {}}
						placeholder="Enter your password"
						type="password"
						required
					/>
					<Button
						type="submit"
						className="w-full"
						size="lg"
						disabled={false}
					>Continue</Button>
				</form>
			</CardContent>
		</Card>
	);
};