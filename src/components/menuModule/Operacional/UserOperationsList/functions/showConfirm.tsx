import { Modal } from "antd";

function showConfirm(action: string) {
    Modal.confirm({
        title: `Você deseja ${action}?`,
        content: `Confirme se deseja ${action.toLowerCase()}.`,
        onOk() {
            console.log(`Confirmado: ${action}`);
        },
        onCancel() {
            console.log(`Cancelado: ${action}`);
        },
    });
}

export default showConfirm;