import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Info, ChevronDown } from 'lucide-react';
import DonutChartsGroup from '@/components/ui/DonutChartsGroup'; 

export default function OPZPresaleUI() {
  const [eth, setEth] = useState('');
  const [opz, setOpz] = useState(0);
  const [timer, setTimer] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [connected, setConnected] = useState(false);
  const [ethDropdownOpen, setEthDropdownOpen] = useState(false);
  const [opzDropdownOpen, setOpzDropdownOpen] = useState(false);
  const TOKEN_RATE = 41711;
  const TOTAL_TOKENS = 29000000;
  const SOLD_TOKENS = 26926728;
  const REMAINING_TOKENS = TOTAL_TOKENS - SOLD_TOKENS;
  const RAISED_AMOUNT = 889364.92;
  const PERCENT_SOLD = ((SOLD_TOKENS / TOTAL_TOKENS) * 100).toFixed(2);

  useEffect(() => {
    const countdown = () => {
      const now = new Date();
      const deadline = new Date();
      deadline.setHours(deadline.getHours() + 22);
      const diff = deadline - now;
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimer({ hours, minutes, seconds });
    };
    countdown();
    const interval = setInterval(countdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      setConnected(true);
    }
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest('.dropdown')) {
      setEthDropdownOpen(false);
      setOpzDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleEthChange = (e) => {
    const value = e.target.value;
    setEth(value);
    const ethNum = parseFloat(value);
    if (!isNaN(ethNum)) {
      setOpz(ethNum * TOKEN_RATE);
    } else {
      setOpz(0);
    }
  };

  

  return (
     <div className="min-h-screen bg-gradient-to-br from-black to-blue-900 text-white p-4 md:p-6">
  <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8"
  initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}>
      {/* Left Section */}
      <motion.div className="flex flex-col justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <h1 className="text-3xl font-bold mb-4">Join the Presale</h1>
        <h2 className="text-4xl font-bold mb-2">
          World's First <span className="text-blue-400">AI Powered</span> Wallet & DEX, Up To <span className="text-blue-400">97% APY</span>
        </h2>
        <p className="text-md text-gray-300 mb-4">
          The OPZ platform is an all-in-one solution combining a wallet and exchange that is supercharged with advanced AI technology.
        </p>

        <hr className="border-gray-700 mb-2" />
        <p className="text-lg font-semibold mb-1">00 Days {timer.hours} Hours {timer.minutes} Minutes {timer.seconds} Seconds</p>
        <hr className="border-gray-700 mt-1 mb-2" />
        <p className="text-sm text-gray-400 mb-4">Until Price Increase</p>

        <ul className="text-md space-y-2 mb-4">
          <li>✅ <strong>OPZ-AI:</strong> The AI system takes over, trading continuously on 10,000+ cryptocurrencies</li>
          <li>✅ <strong>OPZ-DEX:</strong> First-of-its-kind Bitcoin's Layer 2 decentralized spot & perpetual trading platform.</li>
        </ul>

        <div className="flex gap-4 mb-4">
          <Button className="bg-blue-900 text-gray-400 hover:bg-blue-600 hover:text-white font-bold">Whitepaper</Button>
          <Button className="bg-blue-900 text-gray-400 hover:bg-blue-600 hover:text-white font-bold">Pitch Deck</Button>
        </div>

        <div className="mt-2">
          <p className="text-sm text-gray-500 mb-1">Audit by:</p>
          <img src="/images/certik.png" alt="Certik Audit" className="h-20 filter invert" />
        </div>
      </motion.div>

      {/* Right Section */}
      <motion.div className="p-4 md:p-6 rounded-2xl w-full text-center shadow-2xl" style={{ backgroundColor: '#090c4f' }}
      initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}>
        <h2 className="text-2xl font-bold text-blue-400 mb-1">OPZ Presale</h2>
        <h3 className="text-lg font-semibold text-white mb-4">Stage 13</h3>

        <div className="text-sm flex justify-between mb-2">
          <span>1 OPZ = $0.04385</span>
          <span>Next Stage = $0.04415</span>
        </div>

        <div className="mb-4">
          <div className="relative w-full h-6 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-900 to-blue-600 rounded-full text-xs text-white flex justify-between items-center px-2"
              style={{ width: `${PERCENT_SOLD}%` }}
            >
              <span className="text-white text-[11px]">Remaining Tokens: {REMAINING_TOKENS.toLocaleString()}</span>
              <span className="text-white text-[11px]">{PERCENT_SOLD}%</span>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm">Total Raised: {SOLD_TOKENS.toLocaleString()} OPZ = ${RAISED_AMOUNT.toLocaleString()}</p>
        </div>

        <div className="mb-2 text-sm flex justify-between items-center">
          <div className="text-left">
            <p className="text-xs text-gray-400">1 ETH is</p>
            <p className="text-2xl font-bold text-white">41,711 OPZ</p>
          </div>
          <div className="bg-white text-black px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1">
            Stage 13 Bonus <Info className="w-3 h-3" />
          </div>
        </div>

        <div className="mb-4 bg-white rounded-xl p-2 text-left">
          <p className="text-xs text-gray-500 mb-1">
            Balance: <span className="text-gray-700">0.0000 ETH</span>
            <span className="text-purple-600 text-[10px] font-semibold ml-1">MAX</span>
          </p>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2 text-blue-500 text-sm">
              <img src="/images/ethereum.png" alt="ETH" className="h-7 w-7" />
              <input
                type="number"
                min="0.026"
                max="800"
                step="0.01"
                placeholder="Enter ETH"
                className="text-black border rounded-md px-2 py-1 w-32 text-sm"
                value={eth}
                onChange={handleEthChange}
              />
            </div>
            <div className="relative dropdown">
              <div onClick={() => setEthDropdownOpen(!ethDropdownOpen)} className="flex items-center gap-1 text-sm text-black bg-white border px-2 py-1 rounded-md cursor-pointer">
                <img src="images/ethereum.png" alt="ETH" className="h-6 w-6" /> ETH <ChevronDown className="w-3 h-3" />
              </div>
              {ethDropdownOpen && (
                <div className="absolute right-0 mt-1 w-32 bg-white border rounded shadow-md text-black text-sm z-10">
                  <div className="p-2 hover:bg-gray-100 cursor-pointer">ETH</div>
                  <div className="p-2 hover:bg-gray-100 cursor-pointer">BSC</div>
                  <div className="p-2 hover:bg-gray-100 cursor-pointer">Others</div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mb-4 bg-white rounded-xl p-2 text-left">
          <label className="text-xs text-gray-400 block mb-1">Receive</label>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-blue-500 text-sm">
              <img src="/images/opz.png" alt="OPZ" className="h-6 w-6" />
              <span>{opz.toFixed(2)} OPZ</span>
            </div>
            <div className="relative dropdown">
              <div onClick={() => setOpzDropdownOpen(!opzDropdownOpen)} className="flex items-center gap-1 text-sm text-black bg-white border px-2 py-1 rounded-md cursor-pointer">
                <img src="/images/opz.png" alt="OPZ" className="h-5 w-5" /> OPZ <ChevronDown className="w-3 h-3" />
              </div>
              {opzDropdownOpen && (
                <div className="absolute right-0 mt-1 w-32 bg-white border rounded shadow-md text-black text-sm z-10">
                  <div className="p-2 hover:bg-gray-100 cursor-pointer">OPZ</div>
                  <div className="p-2 hover:bg-gray-100 cursor-pointer">USDT</div>
                  <div className="p-2 hover:bg-gray-100 cursor-pointer">BTC</div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm mb-2">Payment Method:</p>
          <div className="grid grid-cols-4 gap-2">
            <Button className="bg-blue-900 text-gray-400 hover:bg-blue-600 hover:text-white font-bold">ETH</Button>
            <Button className="bg-blue-900 text-gray-400 hover:bg-blue-600 hover:text-white font-bold">BSC</Button>
            <Button className="bg-blue-900 text-gray-400 hover:bg-blue-600 hover:text-white font-bold">OTHERS</Button>
            <Button className="bg-blue-900 text-gray-400 hover:bg-blue-600 hover:text-white font-bold">CARD</Button>
          </div>
        </div>

        <Button className="w-full bg-blue-900 text-gray-400 hover:bg-blue-600 hover:text-white font-bold" onClick={connectWallet}>
          {connected ? 'Wallet Connected' : 'Connect to wallet'}
        </Button>
      </motion.div>

       {/* Tokenomics Section */}
      <motion.div className="w-full bg-black text-white py-10 px-4 md:px-6 mt-10 rounded-xl md:col-span-2"
      initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}>
        <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center md:text-left">Tokenomics</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
         {/* Left - Token Distribution Visual */}
<div className="flex flex-col items-center justify-center gap-6 w-full">
  {/* Big Circle Donut */}
  <motion.div
  className="w-64 h-64 rounded-full relative" 
  style={{
    background: `conic-gradient(
      #22c55e 0% 75%,     /* Green 75% */
      #ec4899 75% 85%,    /* Pink 10% */
      #dc2626 85% 95%,    /* Red 10% */
      #facc15 95% 100%    /* Yellow 5% */
    )`,
    width: '384px', // Increased size
    height: '384px', // Increased size
    borderRadius: '50%', // Keeps the circle shape
    border: '30px solid transparent', // 30px transparent border
    backgroundClip: 'content-box', // Ensures the gradient is applied to the content area of the circle
  }}
  animate={{ rotate: [0, 360] }}
  transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
>
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="bg-black rounded-full w-48 h-48 flex flex-col items-center justify-center text-center border-4 border-white">
        <span className="text-xl font-bold">1,00,000</span>
        <span className="text-xs text-gray-400">Total Supply</span>
      </div>
    </div>
  </motion.div>

  {/* Donut Charts (Custom Component) */}
  <div className="flex justify-center items-center gap-6">
   
  </div>
</div>


          {/* Right - Token Metrics */}
          <div className=" w-full flex flex-col ">
            <div className="mb-6 w-full">
             <DonutChartsGroup />
             </div>
             <motion.div className="bg-gradient-to-r from-blue-900 via-blue-1000 via-60% to-black to-80%  p-4 md:p-6 rounded-xl shadow-md w-full flex flex-col items-start "
             initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}>
            <h3 className="text-xl font-bold text-red-500 mb-4">Token Metrics</h3>
            <ul className="space-y-2 text-sm">
              <li><span className="font-bold text-yellow-400">Token Name:</span> Papigon Token</li>
              <li><span className="font-bold text-yellow-400">Total Supply:</span> 1,00,000 PIN</li>
              <li><span className="font-bold text-yellow-400">Token Type:</span> ERC-20</li>
              <li><span className="font-bold text-yellow-400">Initial Price:</span> $2</li>
              <li><span className="font-bold text-yellow-400">Listing Price:</span> $4</li>
              <li><span className="font-bold text-yellow-400">Market Cap at Listing:</span> $3,00,000</li>
            </ul>
          </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
    </div>
  );
}
