import React from 'react';
import { useParameter } from '../../context/ParameterContext';

const Inicial: React.FC = () => {
  const { system } = useParameter();
  return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '18px', fontFamily: "sans-serif" }}>Inicial (em breve) <p> Use o menu do canto superior esquerdo </p></div>;
};

export default Inicial;
