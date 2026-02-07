import User from '../modules/user/user.model';
import Product from '../modules/product/product.model';
import Store from '../modules/store/store.model';
import Price from '../modules/price/price.model';
import Cart from '../modules/cart/cart.model';
import CartItem from '../modules/cart/cartItem.model';
import Promotion from '../modules/promotion/promotion.model';
import UserConsent from '../modules/privacy/userConsent.model';

// User <-> Cart
User.hasMany(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });

// Cart <-> CartItem
Cart.hasMany(CartItem, { foreignKey: 'cartId', onDelete: 'CASCADE' });
CartItem.belongsTo(Cart, { foreignKey: 'cartId' });

// Product <-> Price
Product.hasMany(Price, { foreignKey: 'productId' });
Price.belongsTo(Product, { foreignKey: 'productId' });

// Store <-> Price
Store.hasMany(Price, { foreignKey: 'storeId' });
Price.belongsTo(Store, { foreignKey: 'storeId' });

// CartItem references
CartItem.belongsTo(Product, { foreignKey: 'productId' });

// Store <-> Promotion
Store.hasMany(Promotion, { foreignKey: 'storeId' });
Promotion.belongsTo(Store, { foreignKey: 'storeId' });

// Product <-> Promotion
Product.hasMany(Promotion, { foreignKey: 'productId' });
Promotion.belongsTo(Product, { foreignKey: 'productId' });

// User <-> UserConsent
User.hasMany(UserConsent, { foreignKey: 'userId', onDelete: 'CASCADE' });
UserConsent.belongsTo(User, { foreignKey: 'userId' });

export { User, Product, Store, Price, Cart, CartItem, Promotion, UserConsent };
