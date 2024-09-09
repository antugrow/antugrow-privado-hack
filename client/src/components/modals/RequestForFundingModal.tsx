import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import AppInput from "../forms/AppInput";
import AppTextArea from "../forms/AppTextArea";

const RequestForFundingModal = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	return (
		<>
			<Button onPress={onOpen} size="sm" color="primary">
				Request for Funding
			</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent className="antugrow font-nunito">
					{(onClose) => (
						<>
							<ModalHeader>Request for Funding</ModalHeader>
							<ModalBody>
								<AppInput label={"Amount (Ksh)"} placeholder="500" />
								<AppTextArea label="Reason" placeholder="e.g. For buying feeds" />
							</ModalBody>
							<ModalFooter>
								<Button size="sm" variant="flat" color="danger" onPress={onClose}>
									Cancel
								</Button>
								<Button size="sm" color="primary">
									Request
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
};

export default RequestForFundingModal;
