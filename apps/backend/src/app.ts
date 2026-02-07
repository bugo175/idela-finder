import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/environment';
import { errorHandler } from './middleware/errorHandler';
import userRoutes from './modules/user/user.routes';
import productRoutes from './modules/product/product.routes';
import storeRoutes from './modules/store/store.routes';
import priceRoutes from './modules/price/price.routes';
import cartRoutes from './modules/cart/cart.routes';
import promotionRoutes from './modules/promotion/promotion.routes';
import privacyRoutes from './modules/privacy/privacy.routes';

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
const prefix = env.API_PREFIX;
app.use(`${prefix}/users`, userRoutes);
app.use(`${prefix}/products`, productRoutes);
app.use(`${prefix}/stores`, storeRoutes);
app.use(`${prefix}/prices`, priceRoutes);
app.use(`${prefix}/cart`, cartRoutes);
app.use(`${prefix}/promotions`, promotionRoutes);
app.use(`${prefix}/privacy`, privacyRoutes);

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handler
app.use(errorHandler);

export default app;
