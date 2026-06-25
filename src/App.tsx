import { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import { Product, Shop, CartItem, Order, Perspective, CustomerScreen, MerchantScreen, RiderScreen } from './types';
import { initialShops, initialProducts, defaultCartItems } from './data';

// Import components
import Onboarding from './components/Onboarding';
import CustomerHome from './components/CustomerHome';
import CustomerStore from './components/CustomerStore';
import CustomerCart from './components/CustomerCart';
import CustomerCheckout from './components/CustomerCheckout';
import CustomerTracking from './components/CustomerTracking';
import MerchantOrders from './components/MerchantOrders';
import MerchantCatalogue from './components/MerchantCatalogue';
import MerchantRegister from './components/MerchantRegister';
import RiderJobs from './components/RiderJobs';
import RiderTracking from './components/RiderTracking';
import PerspectiveSwitcher from './components/PerspectiveSwitcher';

// Initial pre-loaded orders for merchant/rider views
const initialOrdersList: Order[] = [
  {
    id: '992-A',
    customerName: 'Chioma Eze',
    phone: '+237 677 889 900',
    deliveryAddress: 'Checkpoint, Molyko, Buea',
    instructions: 'Please call before arrival',
    items: [
      { product: initialProducts.find(p => p.id === 'peak-milk-400g')!, quantity: 1 },
      { product: initialProducts.find(p => p.id === 'sliced-bread-large')!, quantity: 1 },
      { product: initialProducts.find(p => p.id === 'ripe-plantains')!, quantity: 1 },
      { product: initialProducts.find(p => p.id === 'sugar-1kg')!, quantity: 1 }
    ],
    subtotal: 7300,
    deliveryFee: 1200,
    total: 8500,
    status: 'Pending',
    type: 'Delivery',
    date: '2 mins ago',
    shopId: 'molyko-supermarket',
    shopName: 'Molyko Supermarket',
    paymentMethod: 'MoMo'
  },
  {
    id: '991-B',
    customerName: 'Amadou Njoya',
    phone: '+237 699 112 233',
    deliveryAddress: 'UB Junction Student Hostels, Buea',
    instructions: 'Deliver to Block B, Room 4',
    items: [
      {
        product: {
          id: 'rice-25kg',
          name: 'Bag of Rice (25kg)',
          category: 'Grocery',
          price: 11000,
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHeY2wc7Gtx5UEOatxLDZiuPFJfvS8CVfrXdJLxfomLqgj6bVoZDa52-AFAYEryejLSRoa3hAOClM14ufXtJrsvUzCK-Da877LMrUpKH0zYoMYf3Umt87cFLIRVU6s4B38bA-vS3Wdjai478Zh5ArdAoODv2TTow6S4ptChZl0PytBqjpE_VhMrFZgx58wH7QSsJElp4bsA9DXrOYrRFpp_PgEjeyaZviL2bjIuSVdLPvLJACrqW0M2-DxHj-L69yQm3zSfA6H7k93',
          status: 'In Stock',
          shopId: 'molyko-supermarket'
        },
        quantity: 1
      }
    ],
    subtotal: 11000,
    deliveryFee: 1000,
    total: 12000,
    status: 'Pending',
    type: 'Delivery',
    date: '5 mins ago',
    shopId: 'molyko-supermarket',
    shopName: 'Molyko Supermarket',
    paymentMethod: 'Orange'
  },
  {
    id: 'BM-8829',
    customerName: 'Nelly Ebage',
    phone: '+237 671 223 344',
    deliveryAddress: 'Near Checkpoint, Molyko, Buea',
    instructions: 'Drop off at the security gate',
    items: [
      { product: initialProducts.find(p => p.id === 'milo-400g')!, quantity: 2 },
      { product: initialProducts.find(p => p.id === 'sugar-1kg')!, quantity: 1 }
    ],
    subtotal: 6200,
    deliveryFee: 1000,
    total: 12500, // Matches checkout screenshot summary total
    status: 'Collected', // En Route
    type: 'Delivery',
    date: '10 mins ago',
    shopId: 'molyko-supermarket',
    shopName: 'Molyko Supermarket',
    paymentMethod: 'MoMo'
  }
];

export default function App() {
  const [perspective, setPerspective] = useState<Perspective>('customer');
  const [customerScreen, setCustomerScreen] = useState<CustomerScreen>('login');
  const [merchantScreen, setMerchantScreen] = useState<MerchantScreen>('orders');
  const [riderScreen, setRiderScreen] = useState<RiderScreen>('jobs');

  // Application States
  const [shops, setShops] = useState<Shop[]>(initialShops);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [cart, setCart] = useState<CartItem[]>(defaultCartItems);
  const [orders, setOrders] = useState<Order[]>(initialOrdersList);
  const [activeShop, setActiveShop] = useState<Shop>(initialShops[0]);
  const [checkoutTotals, setCheckoutTotals] = useState({ subtotal: 3900, deliveryFee: 500, total: 4400 });

  // Order assigned to tracking views
  const [trackedCustomerId, setTrackedCustomerId] = useState<string>('BM-8829');
  const [trackedRiderId, setTrackedRiderId] = useState<string>('BM-8829');

  // Load from local storage if available
  useEffect(() => {
    const savedShops = localStorage.getItem('bueamart_shops');
    const savedProducts = localStorage.getItem('bueamart_products');
    const savedCart = localStorage.getItem('bueamart_cart');
    const savedOrders = localStorage.getItem('bueamart_orders');
    const savedPerspective = localStorage.getItem('bueamart_perspective');

    if (savedShops) setShops(JSON.parse(savedShops));
    if (savedProducts) setProducts(JSON.parse(savedProducts));
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedOrders) setOrders(JSON.parse(savedOrders));
    if (savedPerspective) setPerspective(savedPerspective as Perspective);
  }, []);

  // Save to local storage on updates
  useEffect(() => {
    localStorage.setItem('bueamart_shops', JSON.stringify(shops));
  }, [shops]);

  useEffect(() => {
    localStorage.setItem('bueamart_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('bueamart_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('bueamart_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('bueamart_perspective', perspective);
  }, [perspective]);

  // RESET state helper
  const handleResetSimulation = () => {
    localStorage.removeItem('bueamart_shops');
    localStorage.removeItem('bueamart_products');
    localStorage.removeItem('bueamart_cart');
    localStorage.removeItem('bueamart_orders');
    localStorage.removeItem('bueamart_perspective');

    setShops(initialShops);
    setProducts(initialProducts);
    setCart(defaultCartItems);
    setOrders(initialOrdersList);
    setPerspective('customer');
    setCustomerScreen('login');
    setMerchantScreen('orders');
    setRiderScreen('jobs');
    setTrackedCustomerId('BM-8829');
    setTrackedRiderId('BM-8829');
    setActiveShop(initialShops[0]);
  };

  // --- Customer Workflow Handlers ---
  const handleLoginSuccess = (phone: string) => {
    setCustomerScreen('home');
  };

  const handleSelectShop = (shopId: string) => {
    const selected = shops.find(s => s.id === shopId) || shops[0];
    setActiveShop(selected);
    setCustomerScreen('store');
  };

  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateCartQuantity = (productId: string, newQty: number) => {
    if (newQty <= 0) {
      setCart(prev => prev.filter(item => item.product.id !== productId));
    } else {
      setCart(prev => prev.map(item =>
        item.product.id === productId ? { ...item, quantity: newQty } : item
      ));
    }
  };

  const handleCartCheckout = (details: {
    type: 'Delivery' | 'Pickup';
    address: string;
    instructions: string;
    subtotal: number;
    deliveryFee: number;
    total: number;
  }) => {
    setCheckoutTotals({
      subtotal: details.subtotal,
      deliveryFee: details.deliveryFee,
      total: details.total
    });
    setCustomerScreen('checkout');
  };

  const handleCompleteCheckout = (paymentMethod: 'MoMo' | 'Orange' | 'Cash') => {
    // Generate new order
    const orderId = 'BM-' + Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      id: orderId,
      customerName: 'Nelly Ebage', // pre-filled with screenshot customer
      phone: '+237 671 223 344',
      deliveryAddress: checkoutTotals.deliveryFee > 0 ? 'Near Checkpoint, Molyko, Buea' : 'In-store Pickup',
      instructions: 'Please call when at the gate',
      items: [...cart],
      subtotal: checkoutTotals.subtotal,
      deliveryFee: checkoutTotals.deliveryFee,
      total: checkoutTotals.total,
      status: 'Pending',
      type: checkoutTotals.deliveryFee > 0 ? 'Delivery' : 'Pickup',
      date: 'Just now',
      shopId: activeShop.id,
      shopName: activeShop.name,
      paymentMethod
    };

    setOrders(prev => [newOrder, ...prev]);
    setTrackedCustomerId(orderId);
    setCart([]); // Clear cart
    setCustomerScreen('tracking');
  };

  // --- Merchant Workflow Handlers ---
  const handleConfirmOrder = (orderId: string) => {
    onUpdateOrderStatus(orderId, 'Confirmed');
  };

  const handleDeclineOrder = (orderId: string) => {
    onUpdateStockStatus(orderId, 'Out'); // simulated
    onUpdateOrderStatus(orderId, 'Cancelled');
  };

  const onUpdateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prev => prev.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const onUpdateStockStatus = (productId: string, newStatus: Product['status']) => {
    setProducts(prev => prev.map(product =>
      product.id === productId ? { ...product, status: newStatus } : product
    ));
  };

  const handleRegisterShop = (newShop: Shop) => {
    setShops(prev => [...prev, newShop]);
    setMerchantScreen('orders');
  };

  // --- Rider Workflow Handlers ---
  const handleAcceptJob = (orderId: string) => {
    // Rider accepts the job, advances status to Confirmed (preparing/delivering)
    // Wait, the status was Confirmed, accepting it sets the tracking ID for rider
    setTrackedRiderId(orderId);
    setRiderScreen('tracking');
  };

  const activeRiderOrder = orders.find(o => o.id === trackedRiderId) || null;
  const activeCustomerOrder = orders.find(o => o.id === trackedCustomerId) || null;

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col items-center justify-start">
      {/* App Shell Container representing the mobile phone view */}
      <div className="w-full max-w-md bg-white min-h-screen flex flex-col relative shadow-2xl border-x border-neutral-200">
        
        {/* --- PERSPECTIVE ROUTER --- */}
        
        {/* Customer POV */}
        {perspective === 'customer' && (
          <>
            {customerScreen === 'login' && (
              <Onboarding onLoginSuccess={handleLoginSuccess} />
            )}
            {customerScreen === 'home' && (
              <CustomerHome
                shops={shops}
                onSelectShop={handleSelectShop}
                onNavigateToCart={() => setCustomerScreen('cart')}
                cartCount={cart.reduce((a, b) => a + b.quantity, 0)}
              />
            )}
            {customerScreen === 'store' && (
              <CustomerStore
                shop={activeShop}
                products={products}
                onBack={() => setCustomerScreen('home')}
                onAddToCart={handleAddToCart}
                onNavigateToCart={() => setCustomerScreen('cart')}
                cartCount={cart.reduce((a, b) => a + b.quantity, 0)}
              />
            )}
            {customerScreen === 'cart' && (
              <CustomerCart
                cartItems={cart}
                onUpdateQuantity={handleUpdateCartQuantity}
                onCheckout={handleCartCheckout}
                onBack={() => setCustomerScreen('store')}
              />
            )}
            {customerScreen === 'checkout' && (
              <CustomerCheckout
                subtotal={checkoutTotals.subtotal}
                deliveryFee={checkoutTotals.deliveryFee}
                total={checkoutTotals.total}
                onCompleteCheckout={handleCompleteCheckout}
                onBack={() => setCustomerScreen('cart')}
              />
            )}
            {customerScreen === 'tracking' && (
              <CustomerTracking
                order={activeCustomerOrder}
                onBackToHome={() => setCustomerScreen('home')}
              />
            )}
          </>
        )}

        {/* Merchant POV */}
        {perspective === 'merchant' && (
          <>
            {merchantScreen === 'orders' && (
              <MerchantOrders
                orders={orders}
                onConfirmOrder={handleConfirmOrder}
                onDeclineOrder={handleDeclineOrder}
                onNavigateToCatalogue={() => setMerchantScreen('catalogue')}
                onNavigateToRegister={() => setMerchantScreen('register')}
              />
            )}
            {merchantScreen === 'catalogue' && (
              <MerchantCatalogue
                products={products}
                onUpdateStockStatus={onUpdateStockStatus}
                onNavigateToOrders={() => setMerchantScreen('orders')}
                onNavigateToRegister={() => setMerchantScreen('register')}
              />
            )}
            {merchantScreen === 'register' && (
              <MerchantRegister
                onRegisterSuccess={handleRegisterShop}
                onNavigateToOrders={() => setMerchantScreen('orders')}
                onNavigateToCatalogue={() => setMerchantScreen('catalogue')}
              />
            )}
          </>
        )}

        {/* Rider POV */}
        {perspective === 'rider' && (
          <>
            {riderScreen === 'jobs' && (
              <RiderJobs
                orders={orders}
                onAcceptJob={handleAcceptJob}
                onNavigateToHistory={() => setRiderScreen('history')}
              />
            )}
            {riderScreen === 'tracking' && (
              <RiderTracking
                order={activeRiderOrder}
                onUpdateStatus={onUpdateOrderStatus}
                onBackToJobs={() => setRiderScreen('jobs')}
              />
            )}
            {riderScreen === 'history' && (
              <div className="bg-neutral-50 min-h-screen p-4 flex flex-col justify-center items-center text-center">
                <ShoppingBag className="text-neutral-300 mb-2" size={48} />
                <h3 className="font-bold text-neutral-800 text-sm">No Delivery History</h3>
                <p className="text-xs text-neutral-500 mt-1 max-w-xs">Once you deliver orders successfully, they will show up here.</p>
                <button
                  onClick={() => setRiderScreen('jobs')}
                  className="mt-4 bg-blue-600 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-sm hover:bg-blue-700 cursor-pointer"
                >
                  View Job Board
                </button>
              </div>
            )}
          </>
        )}

      </div>

      {/* Persistent floating walkthrough perspective switcher widget */}
      <PerspectiveSwitcher
        currentPerspective={perspective}
        setPerspective={setPerspective}
        onReset={handleResetSimulation}
      />
    </div>
  );
}
