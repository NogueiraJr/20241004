export interface ActionFlowPoint {
    id: string;
    systemId: string;
    userId: string;
    moment: string;
    seq: string;
    name: string;
    description: string;
    active: boolean;
    createAt: string;
    updatedAt: string;
    deletedAt: string | null;
}
