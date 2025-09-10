/*
REGRAS PARA REUNIR PESSOA COM ANIMAIS
- O animal vai para a pessoa que mostrar todos seus brinquedos favoritos na ordem desejada OK
- Uma pessoa pode intercalar brinquedos que o animal queira ou não, desde que estejam na ordem desejada OK
- Gatos não dividem seus brinquedos Ok
- Se ambas as pessoas tiverem condições de adoção, ninguém fica com o animal (tadinho)
- Uma pessoa não pode levar mais de três animais para casa ok
- Loco não se importa com a ordem dos seus brinquedos desde que tenha outro animal como companhia

ENTRADAS E SAÍDAS
- O programa deve receber três parâmetros de texto: os brinquedos da primeira pessoa, os da segunda pessoa e a ordem em que os animais deve ser considerados
- Cada um desses parâmetros deve conter os itens separados por vírgula
- O programa deve retornar uma estrutura contendo a lista em ordem alfabética dos animais e com quem ficaram ou a mensagem de erro, se houver
- O formato de saída deve ser "nome animal - pessoa número" ou "nome animal - abrigo"
- Caso animal seja inválido ou duplicado, apresentar erro "Animal inválido" Ok
- Caso brinquedo seja inválido ou duplicado, apresentar erro "Brinquedo inválido" Ok
*/

class AbrigoAnimais {
  static dadosAnimais = {
    Rex: { tipo: "cão", brinquedos: ["RATO", "BOLA"] },
    Mimi: { tipo: "gato", brinquedos: ["BOLA", "LASER"] },
    Fofo: { tipo: "gato", brinquedos: ["BOLA", "RATO", "LASER"] },
    Zero: { tipo: "gato", brinquedos: ["RATO", "BOLA"] },
    Bola: { tipo: "cão", brinquedos: ["CAIXA", "NOVELO"] },
    Bebe: { tipo: "cão", brinquedos: ["LASER", "RATO", "BOLA"] },
    Loco: { tipo: "jabuti", brinquedos: ["SKATE", "RATO"] },
  };

  static dadosBrinquedos = [
    "RATO",
    "BOLA",
    "LASER",
    "CAIXA",
    "NOVELO",
    "SKATE",
  ];

  tratarBrinquedos(arrayBrinquedo) {
    const dictBrinquedos = new Map();

    let arrayAuxiliar = arrayBrinquedo.split(",");

    arrayAuxiliar.forEach((brinquedo) => {
      if (
        !AbrigoAnimais.dadosBrinquedos.includes(brinquedo) ||
        dictBrinquedos.has(brinquedo)
      ) {
        throw new Error("Brinquedo inválido");
      }
      dictBrinquedos.set(brinquedo, "livre");
    });

    return dictBrinquedos;
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    let qtdPessoa1 = 0;
    let qtdPessoa2 = 0;
    let dictPessoa1 = new Map();
    let dictPessoa2 = new Map();
    let arrayAuxiliar = [];

    try {
      dictPessoa1 = this.tratarBrinquedos(brinquedosPessoa1);
      dictPessoa2 = this.tratarBrinquedos(brinquedosPessoa2);

      console.log(dictPessoa1);
      console.log(dictPessoa2);
    } catch (e) {
      return { erro: e.message };
    }

    const nomesAnimais = ordemAnimais.split(",");
    const animaisMap = new Map();

    for (const nomeAnimal of nomesAnimais) {
      try {
        const dadosAnimal = AbrigoAnimais.dadosAnimais[nomeAnimal];

        if (!dadosAnimal || animaisMap.has(nomeAnimal)) {
          throw new Error("Animal inválido");
        }

        const AnimalClasse = tiposDeAnimais[dadosAnimal.tipo];

        const animalInstancia = new AnimalClasse(
          nomeAnimal,
          dadosAnimal.brinquedos
        );

        animaisMap.set(nomeAnimal, animalInstancia);

        if (dadosAnimal.tipo === "jabuti") {
          if (qtdPessoa1 > 0 || qtdPessoa2 > 0) {
          }
        }

        if (qtdPessoa1 <= 3) {
          animalInstancia.checarCompatibilidade(dictPessoa1, 1);
        }

        if (qtdPessoa2 <= 3) {
          animalInstancia.checarCompatibilidade(dictPessoa2, 2);
        }

        if (animalInstancia.responsavel === 1) {
          qtdPessoa1++;
        }

        if (animalInstancia.responsavel === 2) {
          qtdPessoa2++;
        }

        console.log(animalInstancia);
      } catch (e) {
        console.log("Erro:" + e.message);
        return { erro: e.message };
      }
    }
  }
}

class Animal {
  constructor(nome, brinquedos) {
    this.nome = nome;
    this.brinquedos = brinquedos;
    this.responsavel = "abrigo";
  }
}

class Gato extends Animal {
  checarCompatibilidade(mapBrinquedo, numPessoa) {
    let contadorAuxiliar = 0;
    const dicAuxiliar = new Map(mapBrinquedo);

    for (const brinquedo of mapBrinquedo) {
      if (
        this.brinquedos[contadorAuxiliar] === brinquedo[0] &&
        brinquedo[1] === "livre"
      ) {
        contadorAuxiliar += 1;
        dicAuxiliar.set(brinquedo, "gato");
      }
    }

    if (this.brinquedos.length === contadorAuxiliar) {
      if (this.responsavel === "abrigo") {
        this.responsavel = numPessoa;
        return dicAuxiliar;
      } else {
        this.responsavel = "abrigo";
      }
    }

    return mapBrinquedo;
  }
}

class Cachorro extends Animal {
  checarCompatibilidade(mapBrinquedo, numPessoa) {
    let contadorAuxiliar = 0;
    const dicAuxiliar = new Map(mapBrinquedo);

    for (const brinquedo of mapBrinquedo) {
      if (
        this.brinquedos[contadorAuxiliar] === brinquedo[0] &&
        brinquedo[1] !== "gato"
      ) {
        contadorAuxiliar += 1;
        dicAuxiliar.set(brinquedo, "cachorro");
      }
    }

    if (this.brinquedos.length === contadorAuxiliar) {
      if (this.responsavel === "abrigo") {
        this.responsavel = numPessoa;
        return dicAuxiliar;
      } else {
        this.responsavel = "abrigo";
      }
    }

    return mapBrinquedo;
  }
}

class Jabuti extends Animal {
  checarCompatibilidade(arrayBrinquedo) {}
}

const tiposDeAnimais = { cão: Cachorro, gato: Gato, jabuti: Jabuti };

export { AbrigoAnimais as AbrigoAnimais };
console.log(
  new AbrigoAnimais().encontraPessoas(
    "BOLA,LASER",
    "BOLA,NOVELO,RATO,LASER",
    "Mimi,Fofo,Rex,Bola"
  )
);
new AbrigoAnimais().encontraPessoas(
  "BOLA,LASER",
  "BOLA,NOVELO,RATO,LASER",
  "Mimi,Fofo,Rex,Bola"
);
