"use client";
import React, { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus } from "@/api/orders";
import { Order } from "@/Types/OrderPart"; // Define Order type in OrderPart.ts
import trackFacebookEvent from "@/utils/trackFacebookEvent";
import axios from "axios";
import AlertModal from "@/components/AlertModal";
import { useAlert } from "@/context/useAlert";
const StaticsPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [selectedStatus, setSelectedStatus] = useState<{
    [key: string]: string;
  }>({});
  const { alertMessage, setAlertMessage, setAlertType, alertType } = useAlert();
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await getAllOrders();
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setAlertType("error");
        setAlertMessage("حدث خطأ أثناء جلب البيانات");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [setAlertMessage, setAlertType]);

  const handleStatusChange = (orderId: string, status: string) => {
    setSelectedStatus((prevStatus) => ({
      ...prevStatus,
      [orderId]: status,
    }));
  };

  const handleSave = async (orderId: string) => {
    try {
      const status = selectedStatus[orderId];
      const updatedOrder = await updateOrderStatus(orderId, status);
      console.log("Updated order:", updatedOrder);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? updatedOrder : order
        )
      );

      if (status === "completed") {
        const contentIds = updatedOrder.products
          .map((item: { product: string }) => item.product)
          .filter(
            (id: unknown): id is string => id !== null && id !== undefined
          );

        if (contentIds.length > 0) {
          trackFacebookEvent({
            eventName: "Purchase",
            data: {
              content_ids: contentIds,
              content_type: "product",
              value: updatedOrder.totalAmount,
              currency: "DZD",
              contents: updatedOrder.products.map(
                (item: { product: string; quantity: number }) => ({
                  id: item.product,
                  quantity: item.quantity,
                })
              ),
            },
            isAdmin: true, // or false, depending on your logic
          });
        } else {
          console.warn("No valid product IDs found for content_ids");
        }
      }
    } catch (error) {
      setAlertMessage("حدث خطأ أثناء تحديث حالة الطلب");
      setAlertType("error");
      console.error("Error updating order status:", error);
    }
  };

  const handleSaveAll = async () => {
    try {
      const updatePromises = Object.keys(selectedStatus).map((orderId) =>
        updateOrderStatus(orderId, selectedStatus[orderId])
      );
      const updatedOrders = await Promise.all(updatePromises);
      setOrders((prevOrders) =>
        prevOrders.map(
          (order) =>
            updatedOrders.find(
              (updatedOrder) => updatedOrder._id === order._id
            ) || order
        )
      );
      setSelectedStatus({});
      setAlertMessage("تم حفظ جميع التغييرات بنجاح");
      setAlertType("success");
    } catch (error) {
      console.error("Error saving all changes:", error);
      setAlertMessage("حدث خطأ أثناء حفظ التغييرات");
      setAlertType("error");
    }
  };
  const handleExportToSheets = async () => {
    try {
      const values = orders.map((order) => [
        order.phone,
        order.address,
        order.name,
        order.products.map((p) => p.product.name).join(", "),
        order.products.map((p) => p.quantity).join(", "),
        order.totalAmount,
        order.status,
      ]);
      await axios.post(
        `${process.env.NEXT_APP_BACKEND_URL}/api/sheets/update`,
        {
          values,
        }
      );
      setAlertMessage("تم تصدير البيانات بنجاح");
      setAlertType("success");
    } catch (error) {
      console.error(
        "Error exporting data to Google Sheets:",
        axios.isAxiosError(error) && error.response?.data?.message
      );
      setAlertMessage(
        `${
          axios.isAxiosError(error) && error.response?.data?.message
        }حدث خطأ أثناء تصدير البيانات`
      );
      setAlertType("error");
    }
  };
  const getButtonColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-teal-500";
      case "cancelled":
        return "bg-red-500";
      case "pending":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div
      className="container mx-auto p-4 w-full items-end flex flex-col justify-start"
      dir="rtl">
      <div className="w-full md:w-11/12">
        <h1 className="text-2xl font-bold mb-4 text-right">إدارة الطلبات</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white text-right">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">المستخدم</th>
                <th className="py-2 px-4 border-b">المنتجات</th>
                <th className="py-2 px-4 border-b"> الكمية</th>
                <th className="py-2 px-4 border-b">المبلغ الإجمالي</th>
                <th className="py-2 px-4 border-b">الحالة</th>
                <th className="py-2 px-4 border-b">تغيير الحالة</th>
                <th className="py-2 px-4 border-b">حفظ</th>
              </tr>
            </thead>
            <tbody>
              {orders
                .slice()
                .reverse()
                .map((order) => (
                  <tr key={order._id}>
                    <td className="py-2 px-4 border-b">
                      <div className="flex flex-wrap">{order.phone}</div>
                      <div className="flex flex-wrap">{order.address}</div>
                      <div className="flex flex-wrap">{order.name}</div>
                    </td>

                    <td className="py-2 px-4 border-b">
                      {order.products.map((item) => (
                        <div key={item.product._id + item.quantity}>
                          {item.product.name}
                        </div>
                      ))}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {order.products.map((item) => (
                        <div key={item.product._id + item.quantity}>
                          {item.quantity}
                        </div>
                      ))}
                    </td>
                    <td
                      onClick={() => console.log(order)}
                      className="py-2 px-4 border-b">
                      {order.totalAmount} $
                    </td>
                    <td className="py-2 px-4 border-b">{order.status}</td>
                    <td className="py-2 px-4 border-b">
                      <select
                        value={selectedStatus[order._id] || order.status}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                        className="border rounded-lg p-2">
                        <option value="pending">قيد الانتظار</option>
                        <option value="completed">مكتمل</option>
                        <option value="cancelled">ملغى</option>
                      </select>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => handleSave(order._id)}
                        className={`${getButtonColor(
                          selectedStatus[order._id] || order.status
                        )} text-white px-4 py-2 rounded-lg hover:bg-opacity-75 transition-colors duration-200`}>
                        حفظ
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <button
          onClick={handleSaveAll}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 self-end">
          حفظ الكل
        </button>
        <button
          onClick={handleExportToSheets}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200 self-end">
          تصدير إلى Google Sheets
        </button>
        {alertMessage && (
          <AlertModal
            message={alertMessage}
            onClose={() => setAlertMessage(null)}
            type={alertType}
          />
        )}
      </div>
    </div>
  );
};

export default StaticsPage;
