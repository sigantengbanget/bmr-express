import express from 'express';
import cors from 'cors'
import authRoutes from './route/authRoutes'
import bookingRoutes from './route/bookingRoutes';
import roomRoutes from './route/roomRoutes';

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/room', roomRoutes);

export default app;