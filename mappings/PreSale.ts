import {
  Purchased as PurchasedEvent,
  Claimed as ClaimedEvent,
  Refunded as RefundedEvent,
  SaleFinalized as FinalizedEvent,
  SaleCanceled as CanceledEvent,
} from "../generated/templates/PreSale/PreSale";
import { PreSale, SaleTransaction } from "../generated/schema";

enum SaleTransactionType {
  PURCHASE,
  CLAIM,
  REFUND,
}

enum SaleStatus {
  ACTIVE,
  FINALIZED,
  CANCELED,
}

function handlePurchased(event: PurchasedEvent): void {
  // create transaction
  const saleTransactionId = event.transaction.hash.toHex();

  let saleTransactionEntity = SaleTransaction.load(saleTransactionId);

  if (saleTransactionEntity === null) {
    saleTransactionEntity = new SaleTransaction(saleTransactionId);
  }

  saleTransactionEntity.type = SaleTransactionType.PURCHASE;
  saleTransactionEntity.preSale = event.params.sale.toHex();
  saleTransactionEntity.purchaser = event.params.purchaser.toHex();
  saleTransactionEntity.amount = event.params.amount;
  saleTransactionEntity.createdAt = event.block.timestamp;

  saleTransactionEntity.save();
}

function handleClaimed(event: ClaimedEvent): void {
  // create transaction
  const saleTransactionId = event.transaction.hash.toHex();

  let saleTransactionEntity = SaleTransaction.load(saleTransactionId);

  if (saleTransactionEntity === null) {
    saleTransactionEntity = new SaleTransaction(saleTransactionId);
  }

  saleTransactionEntity.type = SaleTransactionType.CLAIM;
  saleTransactionEntity.preSale = event.params.sale.toHex();
  saleTransactionEntity.purchaser = event.params.purchaser.toHex();
  saleTransactionEntity.amount = event.params.amount;
  saleTransactionEntity.createdAt = event.block.timestamp;

  saleTransactionEntity.save();
}

function handleRefunded(event: RefundedEvent): void {
  // create transaction
  const saleTransactionId = event.transaction.hash.toHex();

  let saleTransactionEntity = SaleTransaction.load(saleTransactionId);

  if (saleTransactionEntity === null) {
    saleTransactionEntity = new SaleTransaction(saleTransactionId);
  }

  saleTransactionEntity.type = SaleTransactionType.REFUND;
  saleTransactionEntity.preSale = event.params.sale.toHex();
  saleTransactionEntity.purchaser = event.params.purchaser.toHex();
  saleTransactionEntity.amount = event.params.amount;
  saleTransactionEntity.createdAt = event.block.timestamp;

  saleTransactionEntity.save();
}

function handleFinalized(event: FinalizedEvent): void {
  const preSale = PreSale.load(event.params.sale.toHex());

  if (preSale === null) return;

  preSale.status = SaleStatus.FINALIZED;
  preSale.updatedAt = event.block.timestamp;

  preSale.save();
}

function handleCanceled(event: CanceledEvent): void {
  const preSale = PreSale.load(event.params.sale.toHex());

  if (preSale === null) return;

  preSale.status = SaleStatus.CANCELED;
  preSale.updatedAt = event.block.timestamp;

  preSale.save();
}

export { handlePurchased, handleClaimed, handleRefunded, handleFinalized, handleCanceled };
