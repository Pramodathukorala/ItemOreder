import jsPDF from 'jspdf';

const generateBill = (order) => {
  const doc = new jsPDF();
  
  // Set up document
  doc.setFontSize(20);
  doc.text('Order Bill', 85, 20);
  
  // Add order details
  doc.setFontSize(12);
  doc.text(`Order ID: ${order.orderId}`, 20, 40);
  doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 20, 50);
  doc.text(`Customer: ${order.customerInfo.name}`, 20, 60);
  
  // Add items table
  let yPos = 80;
  doc.text('Item', 20, yPos);
  doc.text('Qty', 100, yPos);
  doc.text('Price', 140, yPos);
  doc.text('Total', 180, yPos);
  
  yPos += 10;
  doc.line(20, yPos, 190, yPos);
  yPos += 10;
  
  // Add items
  order.items.forEach(item => {
    doc.text(item.title, 20, yPos);
    doc.text(item.quantity.toString(), 100, yPos);
    doc.text(`$${item.price.toFixed(2)}`, 140, yPos);
    doc.text(`$${(item.price * item.quantity).toFixed(2)}`, 180, yPos);
    yPos += 10;
  });
  
  // Add total
  yPos += 10;
  doc.line(20, yPos, 190, yPos);
  yPos += 10;
  doc.setFont(undefined, 'bold');
  doc.text(`Total Amount: $${order.total.toFixed(2)}`, 140, yPos);
  
  // Save the PDF
  doc.save(`order-bill-${order.orderId}.pdf`);
};

export default generateBill;
