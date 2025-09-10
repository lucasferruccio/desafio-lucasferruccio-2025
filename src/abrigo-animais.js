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

  validarPessoa(animalInstancia, qtdPessoa, numPessoa, brinquedos) {
    if (qtdPessoa <= 3) {
      if (animalInstancia.tipo === "jabuti") {
        if (qtdPessoa > 0) {
          return animalInstancia.checarCompatibilidade(brinquedos, numPessoa);
        }
      } else {
        return animalInstancia.checarCompatibilidade(brinquedos, numPessoa);
      }
    }
    return brinquedos;
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    let qtdPessoa1 = 0;
    let qtdPessoa2 = 0;
    let dictPessoa1 = new Map();
    let dictPessoa2 = new Map();

    try {
      dictPessoa1 = this.tratarBrinquedos(brinquedosPessoa1);
      dictPessoa2 = this.tratarBrinquedos(brinquedosPessoa2);
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
          dadosAnimal.brinquedos,
          dadosAnimal.tipo
        );

        animaisMap.set(nomeAnimal, animalInstancia);

        dictPessoa1 = this.validarPessoa(
          animalInstancia,
          qtdPessoa1,
          1,
          dictPessoa1
        );
        dictPessoa2 = this.validarPessoa(
          animalInstancia,
          qtdPessoa2,
          2,
          dictPessoa2
        );

        if (animalInstancia.responsavel === 1) {
          qtdPessoa1++;
        }

        if (animalInstancia.responsavel === 2) {
          qtdPessoa2++;
        }
      } catch (e) {
        return { erro: e.message };
      }
    }

    const animaisOrdenados = Array.from(animaisMap.keys()).sort();

    const resultado = [];

    animaisOrdenados.forEach((chave) => {
      let valorResponsavel = animaisMap.get(chave).responsavel;

      if (valorResponsavel !== "abrigo") {
        resultado.push(`${chave} - pessoa ${valorResponsavel}`);
      } else {
        resultado.push(`${chave} - ${valorResponsavel}`);
      }
    });
    return { lista: resultado };
  }
}

class Animal {
  constructor(nome, brinquedos, tipo) {
    this.nome = nome;
    this.brinquedos = brinquedos;
    this.responsavel = "abrigo";
    this.tipo = tipo;
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
  checarCompatibilidade(mapBrinquedo, numPessoa) {
    const dicAuxiliar = new Map(mapBrinquedo);
    let contadorAuxiliar = 0;

    for (const brinquedoNecessario of this.brinquedos) {
      if (mapBrinquedo.has(brinquedoNecessario)) {
        contadorAuxiliar++;
        dicAuxiliar.set(brinquedoNecessario, "jabuti");
      }
    }

    if (contadorAuxiliar === this.brinquedos.length) {
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

const tiposDeAnimais = { cão: Cachorro, gato: Gato, jabuti: Jabuti };

export { AbrigoAnimais as AbrigoAnimais };
