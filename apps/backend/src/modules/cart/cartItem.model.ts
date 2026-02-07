import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/database';

interface CartItemAttributes {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  priceAtAdd: number;
}

interface CartItemCreationAttributes extends Optional<CartItemAttributes, 'id'> {}

class CartItem extends Model<CartItemAttributes, CartItemCreationAttributes> implements CartItemAttributes {
  public id!: string;
  public cartId!: string;
  public productId!: string;
  public quantity!: number;
  public priceAtAdd!: number;
}

CartItem.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    cartId: { type: DataTypes.UUID, allowNull: false, references: { model: 'carts', key: 'id' } },
    productId: { type: DataTypes.UUID, allowNull: false, references: { model: 'products', key: 'id' } },
    quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    priceAtAdd: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  },
  {
    sequelize,
    tableName: 'cart_items',
    indexes: [{ fields: ['cart_id'] }],
  }
);

export default CartItem;
