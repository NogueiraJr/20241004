export function getTitle(system: string): string {
    if (system === 'sysOficinaCarro') {
      return 'Oficina de Carros';
    } else if (system === 'sysLocacaoRoupa') {
      return 'Locação de Roupas';
    } else {
      return 'Inicial (em breve)';
    }
  }
  