import { AbrigoAnimais } from "./abrigo-animais";

describe("Abrigo de Animais", () => {
  test("Deve rejeitar animal inválido", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "CAIXA,RATO",
      "RATO,BOLA",
      "Lulu"
    );
    expect(resultado.erro).toBe("Animal inválido");
    expect(resultado.lista).toBeFalsy();
  });

  test("Deve encontrar pessoa para um animal", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,BOLA",
      "RATO,NOVELO",
      "Rex,Fofo"
    );
    expect(resultado.lista[0]).toBe("Fofo - abrigo");
    expect(resultado.lista[1]).toBe("Rex - pessoa 1");
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeFalsy();
  });

  test("Deve encontrar pessoa para um animal intercalando brinquedos", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "BOLA,LASER",
      "BOLA,NOVELO,RATO,LASER",
      "Mimi,Fofo,Rex,Bola,Loco"
    );

    expect(resultado.lista[0]).toBe("Bola - abrigo");
    expect(resultado.lista[1]).toBe("Fofo - pessoa 2");
    expect(resultado.lista[2]).toBe("Loco - abrigo");
    expect(resultado.lista[3]).toBe("Mimi - abrigo");
    expect(resultado.lista[4]).toBe("Rex - abrigo");
    expect(resultado.lista.length).toBe(5);
    expect(resultado.erro).toBeFalsy();
  });
});

describe("Casos Extras", () => {
  test("Deve rejeitar brinquedo inválido", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,BOLA,FOGUETE",
      "RATO,BOLA",
      "Rex"
    );
    expect(resultado.erro).toBe("Brinquedo inválido");
    expect(resultado.lista).toBeFalsy();
  });

  test("Deve rejeitar animal repetido", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,BOLA",
      "RATO,BOLA",
      "Rex,Rex"
    );
    expect(resultado.erro).toBe("Animal inválido");
    expect(resultado.lista).toBeFalsy();
  });

  test("Se ambas as pessoas atenderem ao mesmo animal, ninguém leva", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,BOLA",
      "RATO,BOLA",
      "Rex"
    );
    expect(resultado.lista[0]).toBe("Rex - abrigo");
  });

  test("Gatos não dividem brinquedos com outros gatos", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "BOLA,RATO,LASER",
      "BOLA,RATO,LASER",
      "Mimi,Fofo"
    );
    expect(resultado.lista[0]).toBe("Fofo - abrigo");
    expect(resultado.lista[1]).toBe("Mimi - abrigo");
  });

  test("Pessoa não pode levar mais de 3 animais", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,BOLA,LASER,CAIXA,NOVELO,SKATE",
      "RATO,BOLA",
      "Rex,Mimi,Fofo,Bola,Bebe,Loco"
    );
    const adotadosPessoa1 = resultado.lista.filter((x) =>
      x.includes("pessoa 1")
    );
    expect(adotadosPessoa1.length).toBeLessThanOrEqual(3);
  });

  test("Jabuti (Loco) não exige ordem, só companhia", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,BOLA,SKATE",
      "LASER",
      "Rex,Loco"
    );
    expect(resultado.lista[0]).toBe("Loco - pessoa 1");
    expect(resultado.lista[1]).toBe("Rex - pessoa 1");
  });

  test("Jabuti (Loco) fica no abrigo se não tiver companhia", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "SKATE,RATO",
      "BOLA",
      "Loco"
    );
    expect(resultado.lista[0]).toBe("Loco - abrigo");
  });

  test("Pessoa 2 pode adotar animal se pessoa 1 não conseguir", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "CAIXA",
      "RATO,BOLA",
      "Rex"
    );
    expect(resultado.lista[0]).toBe("Rex - pessoa 2");
  });

  test("Não deve funcionar mesmo com ordem de brinquedos fora da ordem da lista geral", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "BOLA,RATO",
      "BOLA",
      "Rex"
    );
    expect(resultado.lista[0]).toBe("Rex - abrigo");
  });

  test("Validar se o Loco não pode ser selecionado duas vezes.", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,BOLA,SKATE",
      "BOLA,LASER,RATO,SKATE",
      "Rex,Mimi,Loco"
    );
    expect(resultado.lista[0]).toBe("Loco - abrigo");
    expect(resultado.lista[1]).toBe("Mimi - pessoa 2");
    expect(resultado.lista[2]).toBe("Rex - pessoa 1");
  });
});
