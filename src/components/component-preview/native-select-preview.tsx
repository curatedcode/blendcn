import {
	ComponentAccordionGroup,
	ComponentAccordionSubGroup,
} from "~/components/component-preview/component-accordion";
import {
	NativeSelect,
	NativeSelectOptGroup,
	NativeSelectOption,
} from "~/components/ui/native-select";

export function NativeSelectPreview() {
	return (
		<ComponentAccordionGroup title="Native Select">
			<ComponentAccordionSubGroup title="Default">
				<NativeSelectDefault />
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="With Groups">
				<NativeSelectGroups />
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Disabled">
				<NativeSelectDisabled />
			</ComponentAccordionSubGroup>
			<ComponentAccordionSubGroup title="Invalid">
				<NativeSelectInvalid />
			</ComponentAccordionSubGroup>
		</ComponentAccordionGroup>
	);
}

function NativeSelectDefault() {
	return (
		<NativeSelect>
			<NativeSelectOption value="">Select status</NativeSelectOption>
			<NativeSelectOption value="todo">Todo</NativeSelectOption>
			<NativeSelectOption value="in-progress">In Progress</NativeSelectOption>
			<NativeSelectOption value="done">Done</NativeSelectOption>
			<NativeSelectOption value="cancelled">Cancelled</NativeSelectOption>
		</NativeSelect>
	);
}

function NativeSelectGroups() {
	return (
		<NativeSelect>
			<NativeSelectOption value="">Select department</NativeSelectOption>
			<NativeSelectOptGroup label="Engineering">
				<NativeSelectOption value="frontend">Frontend</NativeSelectOption>
				<NativeSelectOption value="backend">Backend</NativeSelectOption>
				<NativeSelectOption value="devops">DevOps</NativeSelectOption>
			</NativeSelectOptGroup>
			<NativeSelectOptGroup label="Sales">
				<NativeSelectOption value="sales-rep">Sales Rep</NativeSelectOption>
				<NativeSelectOption value="account-manager">
					Account Manager
				</NativeSelectOption>
				<NativeSelectOption value="sales-director">
					Sales Director
				</NativeSelectOption>
			</NativeSelectOptGroup>
			<NativeSelectOptGroup label="Operations">
				<NativeSelectOption value="support">
					Customer Support
				</NativeSelectOption>
				<NativeSelectOption value="product-manager">
					Product Manager
				</NativeSelectOption>
				<NativeSelectOption value="ops-manager">
					Operations Manager
				</NativeSelectOption>
			</NativeSelectOptGroup>
		</NativeSelect>
	);
}

function NativeSelectDisabled() {
	return (
		<NativeSelect disabled>
			<NativeSelectOption value="">Select priority</NativeSelectOption>
			<NativeSelectOption value="low">Low</NativeSelectOption>
			<NativeSelectOption value="medium">Medium</NativeSelectOption>
			<NativeSelectOption value="high">High</NativeSelectOption>
			<NativeSelectOption value="critical">Critical</NativeSelectOption>
		</NativeSelect>
	);
}

function NativeSelectInvalid() {
	return (
		<NativeSelect aria-invalid="true">
			<NativeSelectOption value="">Select role</NativeSelectOption>
			<NativeSelectOption value="admin">Admin</NativeSelectOption>
			<NativeSelectOption value="editor">Editor</NativeSelectOption>
			<NativeSelectOption value="viewer">Viewer</NativeSelectOption>
			<NativeSelectOption value="guest">Guest</NativeSelectOption>
		</NativeSelect>
	);
}
