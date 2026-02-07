import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/database';

interface UserConsentAttributes {
  id: string;
  userId: string;
  consentType: string;
  isGranted: boolean;
  grantedAt: Date;
  revokedAt?: Date;
  ipAddress?: string;
  userAgent?: string;
}

interface UserConsentCreationAttributes extends Optional<UserConsentAttributes, 'id' | 'revokedAt' | 'ipAddress' | 'userAgent'> {}

class UserConsent extends Model<UserConsentAttributes, UserConsentCreationAttributes> implements UserConsentAttributes {
  declare id: string;
  declare userId: string;
  declare consentType: string;
  declare isGranted: boolean;
  declare grantedAt: Date;
  declare revokedAt: Date | undefined;
  declare ipAddress: string | undefined;
  declare userAgent: string | undefined;
}

UserConsent.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false, field: 'user_id' },
    consentType: { type: DataTypes.STRING(50), allowNull: false },
    isGranted: { type: DataTypes.BOOLEAN, allowNull: false },
    grantedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    revokedAt: { type: DataTypes.DATE, allowNull: true },
    ipAddress: { type: DataTypes.STRING(45), allowNull: true },
    userAgent: { type: DataTypes.STRING(255), allowNull: true },
  },
  {
    sequelize,
    tableName: 'user_consent',
    indexes: [
      { fields: ['user_id'] },
      { fields: ['consent_type'] },
    ],
  }
);

export default UserConsent;
