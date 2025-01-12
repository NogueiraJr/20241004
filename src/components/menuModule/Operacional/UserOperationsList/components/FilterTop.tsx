import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Select } from "antd";
import React from "react";
import { OperationType } from "../../../../../interfaces/UserOperationsType";

function FilterTop({ navigate, setStatusFilter, setTagFilter, operations }: { navigate; setStatusFilter: React.Dispatch<React.SetStateAction<string>>; setTagFilter: React.Dispatch<React.SetStateAction<string>>; operations: OperationType[]; }): React.JSX.Element {
    return <div style={{ marginBottom: 16 }}>
      <Button
        type="primary"
        onClick={() => navigate(-1)} // Função para voltar à página anterior
        icon={<ArrowLeftOutlined />} // Usando o ícone de "voltar"
        style={{ marginRight: 16 }} />
      <Select
        placeholder="Filtrar por status"
        onChange={(value) => setStatusFilter(value)}
        style={{ width: 150, marginRight: 8 }}
        defaultValue="all"
      >
        <Select.Option value="all">Todos</Select.Option>
        <Select.Option value="active">Ativo</Select.Option>
        <Select.Option value="inactive">Inativo</Select.Option>
      </Select>
  
      <Select
        placeholder="Filtrar por tag"
        onChange={(value) => setTagFilter(value)}
        style={{ width: 150 }}
        defaultValue="all"
      >
        <Select.Option value="all">Todos</Select.Option>
        {Array.from(new Set(operations.flatMap((locacao) => locacao.tags || []))).map((tag) => (
          <Select.Option key={tag} value={tag}>
            {tag.toUpperCase()}
          </Select.Option>
        ))}
      </Select>
    </div>;
  }

  export default FilterTop;