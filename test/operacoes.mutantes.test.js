const {
  divisao, raizQuadrada, fatorial, mediaArray, maximoArray, minimoArray,
  isPar, isImpar, isPrimo, produtoArray, clamp, isDivisivel,
  celsiusParaFahrenheit, fahrenheitParaCelsius, inverso,
  isMaiorQue, isMenorQue, isEqual, medianaArray
} = require('../src/operacoes');

// Testes adicionados para "matar" os mutantes que sobreviveram na primeira
// execução do Stryker. Cada bloco indica qual fraqueza da suíte original
// ele corrige.
describe('Testes adicionais para matar mutantes sobreviventes', () => {
  describe('divisao', () => {
    // Mata StringLiteral "": o teste original usava toThrow() sem mensagem.
    test('deve lançar erro com a mensagem correta ao dividir por zero', () => {
      expect(() => divisao(5, 0)).toThrow('Divisão por zero não é permitida.');
    });
  });

  describe('raizQuadrada', () => {
    // Mata ConditionalExpression => false e StringLiteral "".
    test('deve lançar erro com mensagem para número negativo', () => {
      expect(() => raizQuadrada(-1)).toThrow(
        'Não é possível calcular a raiz quadrada de um número negativo.'
      );
    });

    // Mata EqualityOperator n <= 0: a raiz de zero é válida.
    test('deve retornar 0 para a raiz quadrada de 0', () => {
      expect(raizQuadrada(0)).toBe(0);
    });
  });

  describe('fatorial', () => {
    // Mata ConditionalExpression => false e StringLiteral "".
    test('deve lançar erro com mensagem para número negativo', () => {
      expect(() => fatorial(-1)).toThrow('Fatorial não é definido para números negativos.');
    });

    // Mata EqualityOperator n <= 0: o fatorial de zero é 1, não um erro.
    test('deve retornar 1 para o fatorial de 0', () => {
      expect(fatorial(0)).toBe(1);
    });

    test('deve retornar 1 para o fatorial de 1', () => {
      expect(fatorial(1)).toBe(1);
    });

    test('deve calcular o fatorial de 5', () => {
      expect(fatorial(5)).toBe(120);
    });
  });

  describe('mediaArray', () => {
    // Mata ConditionalExpression => false: sem o if, 0 / 0 vira NaN.
    test('deve retornar 0 para um array vazio', () => {
      expect(mediaArray([])).toBe(0);
    });
  });

  describe('maximoArray e minimoArray', () => {
    // Mata ConditionalExpression => false e StringLiteral "".
    // A mensagem tem caracteres cirílicos no código-fonte, então o teste
    // confere apenas o trecho em português.
    test('maximoArray deve lançar erro com mensagem para array vazio', () => {
      expect(() => maximoArray([])).toThrow(/possui valor máximo/);
    });

    test('minimoArray deve lançar erro com mensagem para array vazio', () => {
      expect(() => minimoArray([])).toThrow(/possui valor mínimo/);
    });
  });

  describe('isPar e isImpar', () => {
    // Mata ConditionalExpression => true: o teste original só tinha um par.
    test('isPar deve retornar false para um número ímpar', () => {
      expect(isPar(3)).toBe(false);
    });

    // Mata ConditionalExpression => true e ArithmeticOperator n * 2.
    test('isImpar deve retornar false para um número par', () => {
      expect(isImpar(8)).toBe(false);
    });
  });

  describe('isPrimo', () => {
    // Mata as mutações de n <= 1 (NoCoverage e Survived).
    test('deve retornar false para 0 e para 1', () => {
      expect(isPrimo(0)).toBe(false);
      expect(isPrimo(1)).toBe(false);
    });

    test('deve retornar true para 2', () => {
      expect(isPrimo(2)).toBe(true);
    });

    // Mata as mutações do laço e do resto: o original só testava um primo.
    test('deve retornar false para um número composto ímpar', () => {
      expect(isPrimo(9)).toBe(false);
    });

    test('deve retornar false para um número composto par', () => {
      expect(isPrimo(4)).toBe(false);
    });
  });

  describe('produtoArray', () => {
    test('deve retornar 1 para um array vazio', () => {
      expect(produtoArray([])).toBe(1);
    });
  });

  describe('clamp', () => {
    // Mata ConditionalExpression => false nos dois ramos.
    test('deve retornar o mínimo quando o valor está abaixo do intervalo', () => {
      expect(clamp(-5, 0, 10)).toBe(0);
    });

    test('deve retornar o máximo quando o valor está acima do intervalo', () => {
      expect(clamp(15, 0, 10)).toBe(10);
    });
  });

  describe('isDivisivel', () => {
    // Mata ConditionalExpression => true.
    test('deve retornar false quando não é divisível', () => {
      expect(isDivisivel(10, 3)).toBe(false);
    });
  });

  describe('conversão de temperatura', () => {
    // Com 0 °C e 32 °F as mutações de * e / dão o mesmo resultado.
    // Valores diferentes de zero distinguem as operações.
    test('deve converter 100 °C para 212 °F', () => {
      expect(celsiusParaFahrenheit(100)).toBeCloseTo(212);
    });

    test('deve converter 212 °F para 100 °C', () => {
      expect(fahrenheitParaCelsius(212)).toBeCloseTo(100);
    });
  });

  describe('inverso', () => {
    // Mata ConditionalExpression => false e StringLiteral "".
    test('deve lançar erro com mensagem ao inverter zero', () => {
      expect(() => inverso(0)).toThrow('Não é possível inverter o número zero.');
    });
  });

  describe('comparações', () => {
    // Mata ConditionalExpression => true e a fronteira > / >=.
    test('isMaiorQue deve retornar false quando o primeiro é menor', () => {
      expect(isMaiorQue(5, 10)).toBe(false);
    });

    test('isMaiorQue deve retornar false para valores iguais', () => {
      expect(isMaiorQue(5, 5)).toBe(false);
    });

    test('isMenorQue deve retornar false quando o primeiro é maior', () => {
      expect(isMenorQue(10, 5)).toBe(false);
    });

    test('isMenorQue deve retornar false para valores iguais', () => {
      expect(isMenorQue(5, 5)).toBe(false);
    });

    test('isEqual deve retornar false para valores diferentes', () => {
      expect(isEqual(7, 8)).toBe(false);
    });
  });

  describe('medianaArray', () => {
    test('deve lançar erro com mensagem para array vazio', () => {
      expect(() => medianaArray([])).toThrow(/possui mediana/);
    });

    // Mata as mutações do sort: o original só testava um array já ordenado.
    test('deve calcular a mediana de um array ímpar desordenado', () => {
      expect(medianaArray([9, 1, 5, 3, 7])).toBe(5);
    });

    // Mata as mutações do ramo par (linhas 111 e 112): o original nunca
    // chamava a função com tamanho par.
    test('deve calcular a mediana de um array par ordenado', () => {
      expect(medianaArray([1, 2, 3, 4])).toBe(2.5);
    });

    test('deve calcular a mediana de um array par desordenado', () => {
      expect(medianaArray([4, 1, 3, 2])).toBe(2.5);
    });

    test('não deve alterar o array original', () => {
      const original = [3, 1, 2];
      medianaArray(original);
      expect(original).toEqual([3, 1, 2]);
    });
  });
});