import { ActionFlowPoint } from "./ActionFlowPoint";

export interface MultiSelectListProps {
    visible: boolean;
    onCancel: () => void;
    data: { ActionsFlowPoints: ActionFlowPoint[]; };
    systemId: string;
    moment: string;
    title: string;
}
