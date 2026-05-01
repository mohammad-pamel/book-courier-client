import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
// import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

const handlePayNow = (orderId) => {
    navigate(`/dashboard/payment/${orderId}`);
};

const MyOrders = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    // const navigate = useNavigate();

    const { data: orders = [], refetch } = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders`);
            const myOrders = res.data.filter(o => o.customerEmail === user.email);
            return myOrders;

        }
    })

    const { data: books = [] } = useQuery({
        queryKey: ['books'],
        queryFn: async () => {
            const res = await axiosSecure.get('/books');
            return res.data;
        }
    });

    const ordersWithBook = orders.map(order => {
        const book = books.find(b => b._id === order.bookId);
        return { ...order, bookName: book?.name || 'Unknown' };
    });



    const handleCancelOrder = async (id) => {
        try {
            await axiosSecure.patch(`/orders/${id}`, { orderStatus: 'cancelled' });
            refetch();
        } catch (error) {
            console.log(error);
        }
    };


    const statusColor = (status) => {
        const s = status.toLowerCase();
        if (s === 'pending') return 'bg-yellow-400';
        if (s === 'shipped') return 'bg-blue-500';
        if (s === 'delivered') return 'bg-green-600';
        if (s === 'cancelled') return 'bg-red-500';
        return 'bg-gray-400';
    };

    const paymentColor = (status) => {
        const s = status.toLowerCase();
        if (s === 'paid') return 'bg-green-600';
        if (s === 'unpaid') return 'bg-red-500';
        return 'bg-gray-400';
    };

    // const handlePayment = async (order) => {
    //     const paymentInfo = {
    //         price: order.price,
    //         orderId: order._id,
    //         customerEmail: order.customerEmail,
    //         bookName: order.bookName
    //     }
    //     console.log(paymentInfo);

    //     const res = await axiosSecure.post('/create-checkout-session', paymentInfo);

    //     console.log(res.data);

    //     window.location.assign(res.data.url);
    // }


    return (
        <div>
            <div className='w-11/12 mx-auto py-14'>
                <h2 className="text-3xl font-bold my-8">My Orders: {ordersWithBook.length}</h2>

                <div className="overflow-x-auto">
                    <table className="table w-full border">
                        <thead className="">
                            <tr>
                                <th>No</th>
                                <th>Book Title</th>
                                <th>Price</th>
                                <th>Order Date</th>
                                <th>Order Status</th>
                                <th>Payment Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {ordersWithBook.map((order, i) => (
                                <tr key={order._id} className="hover:bg-gray-50">
                                    <td>{i + 1}</td>
                                    <td>{order.bookName}</td>
                                    <td>{order.price}</td>
                                    <td>{new Date(order.orderDate).toLocaleDateString()}</td>

                                    <td>
                                        <span
                                            className={`text-white px-2 py-1 rounded ${statusColor(order.orderStatus)}`}
                                        >
                                            {order.orderStatus}
                                        </span>
                                    </td>

                                    <td>
                                        <span
                                            className={`text-white px-2 py-1 rounded ${paymentColor(order.paymentStatus)}`}
                                        >
                                            {order.paymentStatus}
                                        </span>
                                    </td>

                                    <td className="space-x-2">
                                        {/* Cancel button */}
                                        {order.orderStatus && order.orderStatus.trim().toLowerCase() === 'pending' && (
                                            <button
                                                onClick={() => handleCancelOrder(order._id)}
                                                className="px-2 py-1 rounded bg-red-500 text-white text-xs hover:bg-red-600"
                                            >
                                                Cancel
                                            </button>
                                        )}

                                        {/* Pay Now button */}
                                        {order.orderStatus &&
                                            order.orderStatus.trim().toLowerCase() === 'pending' &&
                                            order.paymentStatus &&
                                            order.paymentStatus.trim().toLowerCase() !== 'paid' && (
                                                <button
                                                    onClick={() => handlePayNow(order._id)}
                                                    className="px-2 py-1 rounded bg-green-600 text-white text-xs"
                                                >
                                                    Pay Now
                                                </button>

                                            )}
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyOrders;
