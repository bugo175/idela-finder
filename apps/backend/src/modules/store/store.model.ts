import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/database';

interface StoreAttributes {
  id: string;
  name: string;
  chain: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  phone?: string;
  isActive: boolean;
}

interface StoreCreationAttributes extends Optional<StoreAttributes, 'id' | 'phone' | 'isActive'> {}

class Store extends Model<StoreAttributes, StoreCreationAttributes> implements StoreAttributes {
  public id!: string;
  public name!: string;
  public chain!: string;
  public address!: string;
  public city!: string;
  public province!: string;
  public postalCode!: string;
  public latitude!: number;
  public longitude!: number;
  public phone?: string;
  public isActive!: boolean;
}

Store.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING(255), allowNull: false },
    chain: { type: DataTypes.STRING(100), allowNull: false },
    address: { type: DataTypes.STRING(255), allowNull: false },
    city: { type: DataTypes.STRING(100), allowNull: false },
    province: { type: DataTypes.STRING(2), allowNull: false },
    postalCode: { type: DataTypes.STRING(5), allowNull: false },
    latitude: { type: DataTypes.DECIMAL(10, 7), allowNull: false },
    longitude: { type: DataTypes.DECIMAL(10, 7), allowNull: false },
    phone: { type: DataTypes.STRING(20), allowNull: true },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  {
    sequelize,
    tableName: 'stores',
    indexes: [
      { fields: ['chain'] },
      { fields: ['city'] },
      { fields: ['province'] },
    ],
  }
);

export default Store;
