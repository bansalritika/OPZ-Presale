const DonutChart = ({ percent, color, label }) => {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="flex flex-col items-center text-center text-white">
      <svg width="80" height="80">
        <circle
          cx="40"
          cy="40"
          r={radius}
          stroke="#333"
          strokeWidth="10"
          fill="none"
        />
        <circle
          cx="40"
          cy="40"
          r={radius}
          stroke={color}
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 40 40)"
        />
      </svg>
      <div className="mt-2 text-[20px]" style={{ color }}>
        <strong>{percent}%</strong>
        <div className="text-white text-sm">{label}</div>
      </div>
    </div>
  );
};

const DonutChartsGroup = () => {
  return (
    <div className="flex flex-wrap gap-4">
      <DonutChart percent={10} color="#FF00FF" label="Sold Out" />
      <DonutChart percent={10} color="#FF0000" label="Donation" />
      <DonutChart percent={5} color="#FFFF00" label="Marketing" />
      <DonutChart percent={75} color="#22c55e" label="Liquidity" />
    </div>
  );
};


export default DonutChartsGroup;
