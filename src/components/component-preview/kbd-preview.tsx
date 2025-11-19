import { SearchIcon } from "lucide-react";
import {
	ComponentGroup,
	ComponentGroupExample,
	ComponentGroupExamples,
	ComponentGroupPreview,
} from "~/components/component-preview";
import { Button } from "~/components/ui/button";
import { ButtonGroup } from "~/components/ui/button-group";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "~/components/ui/input-group";
import { Kbd, KbdGroup } from "~/components/ui/kbd";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "~/components/ui/tooltip";

export function KbdPreview() {
	return (
		<ComponentGroup title="KBD" id="kbd-component">
			<ComponentGroupPreview>
				<div className="flex flex-col items-center gap-4">
					<KbdGroup>
						<Kbd>⌘</Kbd>
						<Kbd>⇧</Kbd>
						<Kbd>⌥</Kbd>
						<Kbd>⌃</Kbd>
					</KbdGroup>
					<KbdGroup>
						<Kbd>Ctrl</Kbd>
						<span>+</span>
						<Kbd>B</Kbd>
					</KbdGroup>
				</div>
			</ComponentGroupPreview>
			<ComponentGroupExamples>
				<ComponentGroupExample title="Group">
					<div className="flex flex-col items-center gap-4">
						<p className="text-muted-foreground text-sm">
							Use{" "}
							<KbdGroup>
								<Kbd>Ctrl + B</Kbd>
								<Kbd>Ctrl + K</Kbd>
							</KbdGroup>{" "}
							to open the command palette
						</p>
					</div>
				</ComponentGroupExample>
				<ComponentGroupExample title="Button">
					<div className="flex flex-wrap items-center gap-4">
						<Button variant="outline" size="sm" className="pr-2">
							Accept <Kbd>⏎</Kbd>
						</Button>
						<Button variant="outline" size="sm" className="pr-2">
							Cancel <Kbd>Esc</Kbd>
						</Button>
					</div>
				</ComponentGroupExample>
				<ComponentGroupExample title="Tooltip">
					<div className="flex flex-wrap gap-4">
						<ButtonGroup>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button size="sm" variant="outline">
										Save
									</Button>
								</TooltipTrigger>
								<TooltipContent>
									<div className="flex items-center gap-2">
										Save Changes <Kbd>S</Kbd>
									</div>
								</TooltipContent>
							</Tooltip>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button size="sm" variant="outline">
										Print
									</Button>
								</TooltipTrigger>
								<TooltipContent>
									<div className="flex items-center gap-2">
										Print Document{" "}
										<KbdGroup>
											<Kbd>Ctrl</Kbd>
											<Kbd>P</Kbd>
										</KbdGroup>
									</div>
								</TooltipContent>
							</Tooltip>
						</ButtonGroup>
					</div>
				</ComponentGroupExample>
				<ComponentGroupExample title="Input Group">
					<div className="flex w-full max-w-xs flex-col gap-6">
						<InputGroup>
							<InputGroupInput placeholder="Search..." />
							<InputGroupAddon>
								<SearchIcon />
							</InputGroupAddon>
							<InputGroupAddon align="inline-end">
								<Kbd>⌘</Kbd>
								<Kbd>K</Kbd>
							</InputGroupAddon>
						</InputGroup>
					</div>
				</ComponentGroupExample>
			</ComponentGroupExamples>
		</ComponentGroup>
	);
}
