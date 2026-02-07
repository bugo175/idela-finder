import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/database';

interface CartAttributes {
  id: string;
  userId: string;
  isActive: boolean;
}

interface CartCreationAttributes extends Optional<CartAttributes, 'id' | 'isActive'> {}

class Cart extends Model<CartAttributes, CartCreationAttributes> implements CartAttributes {
  public id!: string;
  public userId!: string;
  public isActive!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Cart.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false, references: { model: 'users', key: 'id' } },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  {
    sequelize,
    tableName: 'carts',
    indexes: [{ fields: ['user_id'] }],
  }
);

export default Cart;
