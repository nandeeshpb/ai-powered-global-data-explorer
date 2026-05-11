import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';
import { weatherChartData, flightStats, cities } from '../utils/data';

// ---------- HERO ----------
export function HeroSection() {
  return (
    <section id="explore" className="section flex items-center justify-center relative">
      <div className="relative z-10 text-center px-6 max-w-5xl pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
          <span className="text-xs tracking-[0.3em] text-white/70 uppercase">Live Global Data</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.05] tracking-tight"
        >
          Explore the World
          <br />
          <span className="gradient-text">in Real-Time</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-8 text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed"
        >
          AI-powered visualization of global weather, flights, and intelligence —
          rendered in stunning 3D from anywhere on Earth.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="mt-12 flex flex-wrap gap-4 justify-center pointer-events-auto"
        >
          <button className="relative px-8 py-4 rounded-full font-medium overflow-hidden group">
            <span className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple" />
            <span className="relative z-10">Start Exploring</span>
          </button>
          <button className="px-8 py-4 rounded-full font-medium glass hover:bg-white/10 transition-colors">
            Watch Demo
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs tracking-widest text-white/40">SCROLL</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-12 bg-gradient-to-b from-neon-cyan to-transparent"
        />
      </motion.div>
    </section>
  );
}

// ---------- ZOOM SECTION ----------
export function ZoomSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const x = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <section ref={ref} className="section flex items-center">
      <motion.div
        style={{ opacity, x }}
        className="max-w-2xl ml-8 md:ml-24 z-10 relative"
      >
        <h2 className="text-xs tracking-[0.4em] text-neon-cyan mb-4 uppercase">// Section 02</h2>
        <h3 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Zoom into <span className="gradient-text">any corner</span> of the planet
        </h3>
        <p className="text-white/60 text-lg leading-relaxed">
          Engineered with WebGL precision. Drag, zoom, and orbit through a photorealistic
          Earth rendered in real-time. Every continent, every city — at your fingertips.
        </p>

        <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
          {[
            { label: 'Cities', val: '10K+' },
            { label: 'Routes', val: '50K+' },
            { label: 'Updates', val: '24/7' }
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass rounded-xl p-4 text-center"
            >
              <div className="text-2xl font-bold gradient-text">{s.val}</div>
              <div className="text-xs text-white/50 mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ---------- WEATHER SECTION ----------
export function WeatherSection() {
  return (
    <section id="weather" className="section flex items-center justify-end relative">
      <div className="max-w-2xl mr-8 md:mr-24 z-10 relative">
        <motion.h2
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-xs tracking-[0.4em] text-neon-cyan mb-4 uppercase"
        >
          // Section 03
        </motion.h2>
        <motion.h3
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold mb-8 leading-tight"
        >
          Real-time <span className="gradient-text">weather</span> intelligence
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cities.slice(0, 4).map((city, i) => (
            <motion.div
              key={city.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass rounded-2xl p-5 group hover:border-neon-blue/40 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-white/80 font-medium">{city.name}</span>
                <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
              </div>
              <div className="text-3xl font-bold gradient-text mb-1">{city.temp}°C</div>
              <div className="text-xs text-white/40">
                {city.lat.toFixed(2)}°, {city.lng.toFixed(2)}°
              </div>
              <div className="mt-3 h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${Math.min(100, (city.temp / 40) * 100)}%` }}
                  transition={{ delay: i * 0.15 + 0.3, duration: 1 }}
                  viewport={{ once: true }}
                  className="h-full bg-gradient-to-r from-neon-blue to-neon-purple"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- FLIGHT SECTION ----------
export function FlightSection() {
  return (
    <section id="flights" className="section flex items-center justify-start">
      <div className="max-w-2xl ml-8 md:ml-24 z-10 relative">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-xs tracking-[0.4em] text-neon-cyan mb-4 uppercase"
        >
          // Section 04
        </motion.h2>
        <motion.h3
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold mb-8 leading-tight"
        >
          Track <span className="gradient-text">50,000+ flights</span> live
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-white/60 text-lg mb-8 leading-relaxed"
        >
          Watch the world move. Animated arcs visualize active flight routes
          across continents in real-time.
        </motion.p>

        <div className="space-y-3">
          {['London → Tokyo', 'New York → Dubai', 'Sydney → LA'].map((route, i) => (
            <motion.div
              key={route}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 glass rounded-xl px-5 py-3 hover:bg-white/10 transition-colors"
            >
              <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center text-xs font-bold">
                ✈
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">{route}</div>
                <div className="text-xs text-white/40">On schedule • Cruising</div>
              </div>
              <div className="text-xs gradient-text font-bold">LIVE</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- AI INSIGHTS ----------
export function AIInsightsSection() {
  const insights = [
    {
      title: 'Weather Prediction',
      value: '94.2%',
      desc: 'Accuracy across 30-day forecasts in 180 countries.',
      color: 'from-neon-blue to-neon-cyan'
    },
    {
      title: 'Flight Delay Probability',
      value: '12.8%',
      desc: 'Average global probability for the next 24 hours.',
      color: 'from-neon-purple to-neon-pink'
    },
    {
      title: 'Air Traffic Density',
      value: '8,432',
      desc: 'Flights currently active in monitored corridors.',
      color: 'from-neon-cyan to-neon-purple'
    },
    {
      title: 'Climate Anomalies',
      value: '17',
      desc: 'Detected events in the last 6 hours by our AI.',
      color: 'from-neon-pink to-neon-blue'
    }
  ];

  return (
    <section id="ai-insights" className="section py-32 px-6 md:px-24 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-xs tracking-[0.4em] text-neon-cyan mb-4 uppercase">// Section 05</h2>
          <h3 className="text-4xl md:text-6xl font-bold leading-tight">
            <span className="gradient-text">AI Insights</span> at the speed of thought
          </h3>
          <p className="mt-6 text-white/60 max-w-2xl mx-auto text-lg">
            Our neural networks process billions of data points to deliver predictive intelligence in milliseconds.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {insights.map((insight, i) => (
            <motion.div
              key={insight.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.03 }}
              className="relative glass rounded-3xl p-6 overflow-hidden group cursor-pointer"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${insight.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
              <div className="flex items-start justify-between mb-6">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${insight.color} opacity-80`} />
                <span className="text-xs text-white/40 tracking-wider">AI</span>
              </div>
              <div className="text-4xl font-extrabold gradient-text mb-2">{insight.value}</div>
              <div className="text-sm font-medium text-white/90 mb-2">{insight.title}</div>
              <div className="text-xs text-white/50 leading-relaxed">{insight.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- DASHBOARD ----------
function AnimatedCounter({ end, duration = 2, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true);
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration * 60);
    const interval = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(interval); }
      else setCount(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(interval);
  }, [inView, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export function DashboardSection() {
  return (
    <section id="dashboard" className="section py-32 px-6 md:px-24 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-xs tracking-[0.4em] text-neon-cyan mb-4 uppercase">// Section 06</h2>
          <h3 className="text-4xl md:text-6xl font-bold">
            Live <span className="gradient-text">Dashboard</span>
          </h3>
        </motion.div>

        {/* Stat counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Active Flights', val: 8432, suffix: '' },
            { label: 'Cities Monitored', val: 10500, suffix: '+' },
            { label: 'Data Points / sec', val: 2400000, suffix: '' },
            { label: 'AI Predictions', val: 98, suffix: '%' }
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-6"
            >
              <div className="text-3xl md:text-4xl font-bold gradient-text">
                <AnimatedCounter end={s.val} suffix={s.suffix} />
              </div>
              <div className="text-xs text-white/50 mt-2 tracking-wide uppercase">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-6 md:p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-semibold">Global Temperature Trend</h4>
              <span className="text-xs glass px-3 py-1 rounded-full text-neon-cyan">24H</span>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={weatherChartData}>
                <defs>
                  <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00d4ff" stopOpacity={0.6}/>
                    <stop offset="100%" stopColor="#00d4ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="time" stroke="rgba(255,255,255,0.4)" fontSize={11} />
                <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(10,10,10,0.9)',
                    border: '1px solid rgba(0,212,255,0.3)',
                    borderRadius: '12px',
                    backdropFilter: 'blur(10px)'
                  }}
                />
                <Area type="monotone" dataKey="temp" stroke="#00d4ff" strokeWidth={2} fill="url(#tempGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-6 md:p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-semibold">Weekly Flight Activity</h4>
              <span className="text-xs glass px-3 py-1 rounded-full text-neon-purple">7D</span>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={flightStats}>
                <defs>
                  <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#9d4edd" />
                    <stop offset="100%" stopColor="#00d4ff" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={11} />
                <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(10,10,10,0.9)',
                    border: '1px solid rgba(157,78,221,0.3)',
                    borderRadius: '12px'
                  }}
                />
                <Bar dataKey="flights" fill="url(#barGrad)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-24 pt-12 border-t border-white/5 text-center"
      >
        <p className="text-white/40 text-sm">
          © 2025 <span className="gradient-text font-semibold">AI Global Explorer</span> — Crafted with precision.
        </p>
      </motion.footer>
    </section>
  );
}