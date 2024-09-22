import { useState, useRef, useEffect } from 'react';
import { useWatchlist } from '@/hooks/useWatchlist';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from 'next/image';
import styles from './WatchLottery.module.css';
import { Movie } from '@/types/movie';

function WatchLottery() {
  const { watchlist } = useWatchlist();
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const wheelRef = useRef<SVGGElement>(null);

  const spinWheel = () => {
    if (watchlist.length === 0) return;

    setSelectedMovie(null);
    const randomIndex = Math.floor(Math.random() * watchlist.length); // 隨機選擇的電影索引
    const spins = 10; // 總旋轉圈數
    const degreesPerMovie = 360 / watchlist.length; // 每部電影所佔的角度
    // 根據 randomIndex 計算旋轉角度，並加上調整角度

    const degrees = spins * 360 + degreesPerMovie * randomIndex;

    if (wheelRef.current) {
      wheelRef.current.style.transform = `rotate(${degrees}deg)`;
      wheelRef.current.style.transition = 'transform 5s cubic-bezier(0.25, 0.1, 0.25, 0.1)';
    }

    setTimeout(() => {
      setSelectedMovie(watchlist[randomIndex]);
    }, 5000);
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(spinWheel, 0);
    } else {
      setSelectedMovie(null);
    }
  }, [isOpen]);

  const resetLottery = () => {
    setSelectedMovie(null);
    if (wheelRef.current) {
      wheelRef.current.style.transform = 'rotate(0deg)';
      wheelRef.current.style.transition = 'none';
    }
    setTimeout(spinWheel, 0);
  };

  const renderWheel = () => {
    const sliceAngle = 360 / watchlist.length;
    const offset = -90; // 偏移角度，使得第一個電影對應 0 度 (x 軸正方向)
  
    return (
      <svg viewBox="-1 -1 2 2" className={styles.wheel}>
        <defs>
          {watchlist.map((movie, index) => {
            const angle = index * sliceAngle + offset; // 每個扇形都加上偏移
            const endAngle = (index + 1) * sliceAngle + offset;
            const largeArcFlag = sliceAngle <= 180 ? 0 : 1;
            const startX = Math.cos((angle * Math.PI) / 180);
            const startY = Math.sin((angle * Math.PI) / 180);
            const endX = Math.cos((endAngle * Math.PI) / 180);
            const endY = Math.sin((endAngle * Math.PI) / 180);
  
            return (
              <clipPath id={`clip-${movie.id}`} key={`clip-${movie.id}`}>
                <path d={`M 0 0 L ${startX} ${startY} A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY} Z`} />
              </clipPath>
            );
          })}
        </defs>
        <g ref={wheelRef}>
          {watchlist.map((movie, index) => {
            const angle = index * sliceAngle + offset; // 同樣加上偏移
            const endAngle = (index + 1) * sliceAngle + offset;
            const largeArcFlag = sliceAngle <= 180 ? 0 : 1;
            const startX = Math.cos((angle * Math.PI) / 180);
            const startY = Math.sin((angle * Math.PI) / 180);
            const endX = Math.cos((endAngle * Math.PI) / 180);
            const endY = Math.sin((endAngle * Math.PI) / 180);
            const middleAngle = angle + sliceAngle / 2;
            const imageX = Math.cos((middleAngle * Math.PI) / 180) * 0.5;
            const imageY = Math.sin((middleAngle * Math.PI) / 180) * 0.5;
  
            return (
              <g key={movie.id}>
                <g clipPath={`url(#clip-${movie.id})`}>
                  <image
                    href={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    x={imageX - 0.5}
                    y={imageY - 0.5}
                    width="1"
                    height="1"
                    preserveAspectRatio="xMidYMid slice"
                  />
                </g>
                <path 
                  d={`M 0 0 L ${startX} ${startY} A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY} Z`}
                  fill="none"
                  stroke="white"
                  strokeWidth="0.01"
                />
              </g>
            );
          })}
        </g>
        <circle cx="0" cy="0" r="0.05" fill="white" stroke="black" strokeWidth="0.01" />
        <path 
          d="M -0.1 -1.1 L 0.1 -1.1 L 0 -0.9 Z" 
          fill="red"
          stroke="white"
          strokeWidth="0.02"
        />
      </svg>
    );
  };
  

  const renderArrow = () => {
    return (
      <svg viewBox="-1 -1 2 2" className={styles.arrow}>
        <path
          d="M -0.1 -1.1 L 0.1 -1.1 L 0 -0.9 Z"
          fill="red"
          stroke="white"
          strokeWidth="0.02"
        />
      </svg>
    );
  };

  return (
    <>
      <Button
        className={styles.gradientButton}
        onClick={() => setIsOpen(true)}
      >
        Start Watch Lottery
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
          <DialogHeader>
            <DialogTitle>Watch Lottery</DialogTitle>
            <DialogDescription>
              Spin the wheel to decide what to watch next!
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center mt-4">
            {!selectedMovie ? (
              <>
                <div className="relative w-64 h-64 mb-4">
                  {renderWheel()}
                  {renderArrow()}
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center"
              >
                <h3 className="text-xl font-bold mb-4">You should watch:</h3>
                <Image
                  src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
                  alt={selectedMovie.title}
                  width={200}
                  height={300}
                  className="rounded-lg shadow-lg mb-4"
                />
                <h4 className="text-lg font-semibold mb-2">{selectedMovie.title}</h4>
                <p className="text-sm text-gray-300 mb-4">{selectedMovie.overview}</p>
                <Button
                  className={styles.gradientButton}
                  onClick={resetLottery}
                >
                  Spin Again
                </Button>
              </motion.div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WatchLottery;