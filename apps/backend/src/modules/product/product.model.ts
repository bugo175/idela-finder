import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/database';

interface ProductAttributes {
  id: string;
  name: string;
  brand: string;
  category: string;
  subcategory?: string;
  barcode?: string;
  description?: string;
  imageUrl?: string;
  unit: string;
  unitSize: number;
  isActive: boolean;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, 'id' | 'subcategory' | 'barcode' | 'description' | 'imageUrl' | 'isActive'> {}

class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  public id!: string;
  public name!: string;
  public brand!: string;
  public category!: string;
  public subcategory?: string;
  public barcode?: string;
  public description?: string;
  public imageUrl?: string;
  public unit!: string;
  public unitSize!: number;
  public isActive!: boolean;
}

Product.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING(255), allowNull: false },
    brand: { type: DataTypes.STRING(100), allowNull: false },
    category: { type: DataTypes.STRING(100), allowNull: false },
    subcategory: { type: DataTypes.STRING(100), allowNull: true },
    barcode: { type: DataTypes.STRING(50), allowNull: true, unique: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    imageUrl: { type: DataTypes.STRING(500), allowNull: true },
    unit: { type: DataTypes.STRING(10), allowNull: false, defaultValue: 'pz' },
    unitSize: { type: DataTypes.DECIMAL(10, 3), allowNull: false, defaultValue: 1 },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  { sequelize, tableName: 'products' }
);

export default Product;
