import getWhenOperation from "./getWhenOperation";

const handleActionClick = (
action: string, actionId: string, record: any, setModalTitle: React.Dispatch<React.SetStateAction<string>>, setModalData: React.Dispatch<React.SetStateAction<any[]>>, setModalOpen: React.Dispatch<React.SetStateAction<boolean>>, userActions: any[], userActionsItems: any[], getColorForTag: (tag: string) => string, userActionId: string) => {
  console.log(`Action: ${action} - ActionId: ${actionId} - UserOperationId: ${record.id}`);
  setModalTitle(action === "Itens" ? "Itens" : action.charAt(0).toUpperCase() + action.slice(1));

  if (action === "Itens") {
    const userAction = userActions.find(action => action.actionId === actionId && action.userOperationId === record.id && action.id === userActionId);
    const products = userActionsItems.filter(item => item.userActionId === userAction?.id);

    const groupedData = products.reduce((acc: any, product: any) => {
      const { productTypeId, name, description, quantity, price, tags } = product;
      if (!acc[productTypeId]) {
        acc[productTypeId] = [];
      }
      acc[productTypeId].push({ key: product.id, name, description, quantity, price, tags: tags || [] });
      return acc;
    }, {});

    const formattedData = Object.keys(groupedData).map((productTypeId) => ({
      key: productTypeId,
      productTypeId,
      products: groupedData[productTypeId],
    }));

    setModalData(formattedData);
  } else {
    const filteredData = userActions.filter(
      (userAction) => userAction.userOperationId === record.id && userAction.actionId.toLowerCase().trim() === actionId.toLowerCase().trim()
    ).map((userAction) => ({
      key: userAction.id,
      description: userAction.description,
      tags: userAction.tags,
      notes: userAction.notes,
      scheduledAt: getWhenOperation(
        userAction,
        (date) => date ? "finish" : "wait", // Exemplo de função para getStepStatus
        (date, color) => date ? color : "gray" // Exemplo de função para getStepIconColor
      ),
      
      action: userAction.actionId,
      executedAt: userAction.executedAt,
      finishedAt: userAction.finishedAt,
    }));

    setModalData(filteredData);
  }

  setModalOpen(true);
};

export default handleActionClick;
