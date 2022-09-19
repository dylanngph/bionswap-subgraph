import { SaleCreated as SaleCreatedEvent } from "../generated/PreSaleFactory/PreSaleFactory";
import { PreSale } from "../generated/schema";

function handlePreSaleCreated(event: SaleCreatedEvent): void {
  const saleAddress = event.params.sale.toHex();
  let entity = PreSale.load(saleAddress);
  if (entity === null) {
    entity = new PreSale(saleAddress);
  }

  entity.owner = event.params.owner.toHex();
  entity.saleType = 0;
  entity.salt = event.params.salt;
  entity.createdAt = event.block.timestamp;

  entity.save();
}

export { handlePreSaleCreated };
