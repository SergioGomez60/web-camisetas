import express from 'express';
import Stripe from 'stripe';

// ⚠️ SUSTITUYE ESTO POR TU CLAVE SECRETA DE STRIPE (sk_test_...)
const stripe = new Stripe('sk_test_51Sh4z4AEGWwabzs5Vj7KSRAKmcPDFjJ5HbKhC2EKNy2ayi2CS53ZsiBW2kjgpIxaKxwdnqk6sol28uawR5jfBaj400NGaHeg5t'); 

const router = express.Router();

router.post('/crear-intencion', async (req, res) => {
    try {
        const { importe } = req.body; // Importe en céntimos

        const paymentIntent = await stripe.paymentIntents.create({
            amount: importe, 
            currency: 'eur',
            automatic_payment_methods: { enabled: true },
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;