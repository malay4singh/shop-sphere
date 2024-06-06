const Order = require('../models/Order');
const User = require('../models/User');
const Razorpay = require('razorpay');
const { validatePaymentVerification } = require('razorpay/dist/utils/razorpay-utils');

module.exports.createOrder = async (req, res) => {
        var { amount } = req.body;
        const { userID } = req.userData;

        amount = amount *100;

        try {
                const instance = new Razorpay({
                        key_id: process.env.RZP_ID,
                        key_secret: process.env.RZP_SECRET
                })

                const order = await instance.orders.create({
                        amount,
                        currency: 'INR'
                })

                const user = await User.findById(userID).populate('cart');

                const newOrder = await Order.create({
                        _id: order.id,
                        amount: order.amount,    
                        user
                })

                user.cart.map(item => {
                        newOrder.products.push(item);
                })

                await newOrder.save();

                res.status(201).json({
                        success: true,
                        message: 'Order Created',
                        order
                })
        } catch (err) {
                console.log(err);
        }
}

module.exports.verifyOrder = async (req, res) => {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature }=req.body;

        const isValid = validatePaymentVerification({
                order_id: razorpay_order_id,
                payment_id: razorpay_payment_id
        }, razorpay_signature, process.env.RZP_SECRET)

        if (!isValid) {
                return res.status(400).json({
                        success: false,
                        message: 'Payment Verification failed'
                })
        }

        await Order.findByIdAndUpdate({ _id:razorpay_order_id }, { paymentStatus:true });

        res.status(200).json({
                success: true,
                message: 'Payment Verification successful'
        })
}