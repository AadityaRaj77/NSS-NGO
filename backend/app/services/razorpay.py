import razorpay
import os
import hmac
import hashlib

client = razorpay.Client(
    auth=(
        os.getenv("RAZORPAY_KEY_ID"),
        os.getenv("RAZORPAY_KEY_SECRET"),
    )
)

def verify_signature(order_id, payment_id, signature):
    body = f"{order_id}|{payment_id}"
    expected = hmac.new(
        os.getenv("RAZORPAY_KEY_SECRET").encode(),
        body.encode(),
        hashlib.sha256
    ).hexdigest()

    return expected == signature
