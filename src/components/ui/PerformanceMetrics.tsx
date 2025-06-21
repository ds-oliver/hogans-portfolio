"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { XAxis, YAxis, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface MetricData {
  name: string;
  value: number;
  change: number;
  unit: string;
}

interface PerformanceData {
  time: string;
  visitors: number;
  engagement: number;
}

export default function PerformanceMetrics() {
  const [metrics, setMetrics] = useState<MetricData[]>([
    { name: 'Page Load Time', value: 0.8, change: -12, unit: 's' },
    { name: 'Performance Score', value: 98, change: +5, unit: '/100' },
    { name: 'Accessibility', value: 100, change: 0, unit: '/100' },
    { name: 'SEO Score', value: 95, change: +3, unit: '/100' },
  ]);

  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([
    { time: '00:00', visitors: 0, engagement: 0 },
    { time: '00:05', visitors: 2, engagement: 85 },
    { time: '00:10', visitors: 5, engagement: 92 },
    { time: '00:15', visitors: 8, engagement: 88 },
    { time: '00:20', visitors: 12, engagement: 95 },
    { time: '00:25', visitors: 15, engagement: 90 },
  ]);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: metric.name === 'Page Load Time' 
          ? Math.max(0.5, metric.value + (Math.random() - 0.5) * 0.1)
          : Math.min(100, Math.max(80, metric.value + (Math.random() - 0.5) * 2))
      })));

      setPerformanceData(prev => {
        const newData = [...prev];
        const lastEntry = newData[newData.length - 1];
        const newTime = new Date(Date.now()).toLocaleTimeString('en-US', { 
          hour12: false, 
          minute: '2-digit', 
          second: '2-digit' 
        }).slice(-5);
        
        newData.push({
          time: newTime,
          visitors: lastEntry.visitors + Math.floor(Math.random() * 3),
          engagement: Math.max(70, Math.min(100, lastEntry.engagement + (Math.random() - 0.5) * 10))
        });

        return newData.slice(-6); // Keep only last 6 data points
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="rounded-xl border-2 border-gray-600 bg-charcoal-300 shadow-lg gradient-border-hover"
    >
      <div className="p-8">
        <h3 className="text-xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>
          Performance Metrics
        </h3>
        
        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-lg border-2 border-gray-500 bg-charcoal-200 p-4 gradient-border-hover"
            >
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>
                  {metric.value.toFixed(metric.name === 'Page Load Time' ? 1 : 0)}
                  <span className="text-sm" style={{ color: 'var(--foreground-secondary)' }}>{metric.unit}</span>
                </div>
                <div className="text-sm mb-1" style={{ color: 'var(--foreground-secondary)' }}>
                  {metric.name}
                </div>
                <div className={`text-xs flex items-center justify-center ${
                  metric.change >= 0 ? 'text-persian_green' : 'text-burnt_sienna'
                }`}>
                  <span>{metric.change >= 0 ? '↗' : '↘'}</span>
                  <span>{Math.abs(metric.change)}%</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Performance Chart */}
        <div className="h-48">
          <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--foreground-secondary)' }}>
            Live Engagement Metrics
          </h4>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="engagementGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--accent-teal)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--accent-gold)" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="time" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: 'var(--foreground-secondary)' }}
              />
              <YAxis hide />
              <Area
                type="monotone"
                dataKey="engagement"
                stroke="var(--accent-teal)"
                strokeWidth={2}
                fill="url(#engagementGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
} 