import React from 'react';
import { useParameter } from '../../../context/ParameterContext';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import '../../../index.css';
import { getTitle } from './Graficos/getTitle';
import { renderCharts } from './Graficos/renderCharts';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

const Inicial: React.FC = () => {
  const { system } = useParameter();

  return (
    <div className="inicial-container">
      <h2>{getTitle(system)}</h2>
      {renderCharts(system)}
    </div>
  );
};

export default Inicial;
