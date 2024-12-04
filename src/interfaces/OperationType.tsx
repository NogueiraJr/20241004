export interface OperationType {
  id: string;
  description: string;
  active: boolean;
  notes: string;
  priceActions: string;
  priceCharged: string;
  tags: string[] | null;
}
