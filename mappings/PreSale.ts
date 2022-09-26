import { Purchased as PurchasedEvent } from "../generated/templates/PreSale/PreSale";
import { Purchase } from "../generated/schema";

function handlePurchased(event: PurchasedEvent): void {
  // create purchase
  const purchaseId = event.transaction.hash.toHex();

  let purchaseEntity = Purchase.load(purchaseId);

  if (purchaseEntity === null) {
    purchaseEntity = new Purchase(purchaseId);
  }

  purchaseEntity.preSale = event.params.sale.toHex();
  purchaseEntity.purchaser = event.params.purchaser.toHex();
  purchaseEntity.amount = event.params.amount;
  purchaseEntity.createdAt = event.block.timestamp;

  purchaseEntity.save();
}

export { handlePurchased };
