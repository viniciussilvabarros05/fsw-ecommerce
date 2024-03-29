import { Badge } from "@/components/ui/badge";
import { authOptions } from "@/lib/auth";
import { prismaClient } from "@/lib/prisma";
import { PackageSearchIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import OrderItem from "./components/order-item";
const OrderPage = async () => {
  const user = await getServerSession(authOptions);

  if (!user) {
    return <p>Access Denied</p>;
  }

  const orders = await prismaClient.order.findMany({
    where: {
      userId: (user as any).id,
    },
    include: {
      orderProducts: {
        include:{
            product:true,
        }
      },
    },
  });

  return (
    <div className="flex flex-col w-full p-5 gap-8">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.325rem] text-base uppercase"
        variant="outline"
      >
        <PackageSearchIcon size={16} />
        <h1>Meus Pedidos</h1>
      </Badge>
      <div className="flex flex-col gap-5">
        {orders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrderPage;
