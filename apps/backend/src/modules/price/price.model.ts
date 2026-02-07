import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/database';

interface PriceAttributes {
  id: string;
  productId: string;
  storeId: string;
  price: number;
  pricePerUnit: number;
  currency: string;
  isOnSale: boolean;
  salePrice?: number;
  validFrom: Date;
  validTo?: Date;
  lastVerifiedAt: Date;
}

interface PriceCreationAttributes extends Optional<PriceAttributes, 'id' | 'currency' | 'isOnSale' | 'salePrice' | 'validTo'> {}

class Price extends Model<PriceAttributes, PriceCreationAttributes> implements PriceAttributes {
  public id!: string;
  public productId!: string;
  public storeId!: string;
  public price!: number;
  public pricePerUnit!: number;
  public currency!: string;
  public isOnSale!: boolean;
  public salePrice?: number;
  public validFrom!: Date;
  public validTo?: Date;
  public lastVerifiedAt!: Date;
}

Price.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    productId: { type: DataTypes.UUID, allowNull: false, references: { model: 'products', key: 'id' } },
    storeId: { type: DataTypes.UUID, allowNull: false, references: { model: 'stores', key: 'id' } },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    pricePerUnit: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    currency: { type: DataTypes.STRING(3), defaultValue: 'EUR' },
    isOnSale: { type: DataTypes.BOOLEAN, defaultValue: false },
    salePrice: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    validFrom: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    validTo: { type: DataTypes.DATE, allowNull: true },
    lastVerifiedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: 'prices',
    indexes: [
      { fields: ['product_id', 'store_id'] },
      { fields: ['product_id', 'price'] },
      { fields: ['store_id'] },
      { fields: ['is_on_sale'] },
    ],
  }
);

export default Price;
