import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/database';

interface PromotionAttributes {
  id: string;
  storeId: string;
  productId?: string;
  title: string;
  description?: string;
  discountPct: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
}

interface PromotionCreationAttributes extends Optional<PromotionAttributes, 'id' | 'productId' | 'description' | 'isActive'> {}

class Promotion extends Model<PromotionAttributes, PromotionCreationAttributes> implements PromotionAttributes {
  public id!: string;
  public storeId!: string;
  public productId?: string;
  public title!: string;
  public description?: string;
  public discountPct!: number;
  public startDate!: Date;
  public endDate!: Date;
  public isActive!: boolean;
}

Promotion.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    storeId: { type: DataTypes.UUID, allowNull: false, references: { model: 'stores', key: 'id' } },
    productId: { type: DataTypes.UUID, allowNull: true, references: { model: 'products', key: 'id' } },
    title: { type: DataTypes.STRING(255), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    discountPct: { type: DataTypes.DECIMAL(5, 2), allowNull: false },
    startDate: { type: DataTypes.DATEONLY, allowNull: false },
    endDate: { type: DataTypes.DATEONLY, allowNull: false },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  {
    sequelize,
    tableName: 'promotions',
    indexes: [
      { fields: ['store_id'] },
      { fields: ['product_id'] },
      { fields: ['start_date', 'end_date'] },
    ],
  }
);

export default Promotion;
