export const openRazorpay = (options: any) =>
  new Promise((resolve, reject) => {
    const rzp = new (window as any).Razorpay(options);
    rzp.open();
    rzp.on("payment.failed", reject);
  });
