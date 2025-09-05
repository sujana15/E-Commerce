
import { useUser } from "../context/Usercontext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  if (!user) return null;

  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">User Info</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Past Orders</h2>
        {orders.length === 0 ? (
          <p>No past orders.</p>
        ) : (
          <ul className="space-y-3">
            {orders.map((order, index) => (
              <li key={index} className="border p-4 rounded">
                <p><strong>Order ID:</strong> {order.orderId}</p>
                <p><strong>Total:</strong> ₹{order.total}</p>
                <p><strong>Products:</strong></p>
                <ul className="ml-4 list-disc">
                  {order.items.map((item, i) => (
                    <li key={i}>{item.name} × {item.qty}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
