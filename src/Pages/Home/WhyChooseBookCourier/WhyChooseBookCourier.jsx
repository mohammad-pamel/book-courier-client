import React from 'react';
import { FaShippingFast, FaBookOpen, FaUsers, FaHeadset } from 'react-icons/fa';

const features = [
    {
        icon: <FaShippingFast />,
        title: 'Fast Delivery',
        description: 'Get your books delivered to your doorstep quickly and safely.',
    },
    {
        icon: <FaBookOpen />,
        title: 'Wide Selection',
        description: 'Thousands of books from all genres available in one place.',
    },
    {
        icon: <FaUsers />,
        title: 'Trusted Service',
        description: 'Reliable service with happy customers all over the country.',
    },
    {
        icon: <FaHeadset />,
        title: '24/7 Support',
        description: 'Our friendly team is always ready to assist you anytime.',
    }
];

const WhyChooseBookCourier = () => {
    return (
        <section className="py-20">
            <div className="w-11/12 mx-auto text-center">
                <h2 className="text-4xl font-bold mb-4 text-gray-800 animate-fadeIn">Why Choose Book Courier</h2>
                <p className="text-gray-600 mb-12 animate-fadeIn delay-200">
                    Discover the benefits of choosing BookCourier for all your book delivery needs. Fast, reliable, and convenient.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="p-6 rounded-xl shadow-md hover:shadow-xl transition duration-500 transform hover:-translate-y-2 hover:scale-105 opacity-0 animate-fadeIn"
                            style={{ animationDelay: `${index * 200}ms`, animationFillMode: 'forwards' }}
                        >
                            <div className="text-primary text-4xl mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-gray-500 text-sm">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <style>
                {`
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    .animate-fadeIn {
                        animation: fadeIn 0.8s ease forwards;
                    }
                    .delay-200 {
                        animation-delay: 0.2s;
                    }
                `}
            </style>
        </section>
    );
};

export default WhyChooseBookCourier;
