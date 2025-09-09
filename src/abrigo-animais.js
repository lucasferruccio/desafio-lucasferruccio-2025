/*
REGRAS PARA REUNIR PESSOA COM ANIMAIS
- O animal vai para a pessoa que mostrar todos seus brinquedos favoritos na ordem desejada OK
- Uma pessoa pode intercalar brinquedos que o animal queira ou não, desde que estejam na ordem desejada OK
- Gatos não dividem seus brinquedos
- Se ambas as pessoas tiverem condições de adoção, ninguém fica com o animal (tadinho)
- Uma pessoa não pode levar mais de três animais para casa
- Loco não se importa com a ordem dos seus brinquedos desde que tenha outro animal como companhia

ENTRADAS E SAÍDAS
- O programa deve receber três parâmetros de texto: os brinquedos da primeira pessoa, os da segunda pessoa e a ordem em que os animais deve ser considerados
- Cada um desses parâmetros deve conter os itens separados por vírgula
- O programa deve retornar uma estrutura contendo a lista em ordem alfabética dos animais e com quem ficaram ou a mensagem de erro, se houver
- O formato de saída deve ser "nome animal - pessoa número" ou "nome animal - abrigo"
- Caso animal seja inválido ou duplicado, apresentar erro "Animal inválido"
- Caso brinquedo seja inválido ou duplicado, apresentar erro "Brinquedo inválido"
*/

class AbrigoAnimais {
  static dados = {
    Rex: { tipo: "cão", brinquedos: ["RATO", "BOLA"] },
    Mimi: { tipo: "gato", brinquedos: ["BOLA", "LASER"] },
    Fofo: { tipo: "gato", brinquedos: ["BOLA", "RATO", "LASER"] },
    Zero: { tipo: "gato", brinquedos: ["RATO", "BOLA"] },
    Bola: { tipo: "cão", brinquedos: ["CAIXA", "NOVELO"] },
    Bebe: { tipo: "cão", brinquedos: ["LASER", "RATO", "BOLA"] },
    Loco: { tipo: "jabuti", brinquedos: ["SKATE", "RATO"] },
  };

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const dictPessoa1 = new Map();
    const dictPessoa2 = new Map();
    let arrayAuxiliar = [];

    arrayAuxiliar = brinquedosPessoa1.split(",");

    arrayAuxiliar.forEach((brinquedo) => {
      dictPessoa1.set(brinquedo, "livre");
    });

    arrayAuxiliar = brinquedosPessoa2.split(",");

    arrayAuxiliar.forEach((brinquedo) => {
      dictPessoa2.set(brinquedo, "livre");
    });

    const nomesAnimais = ordemAnimais.split(",");
    const animaisMap = new Map();

    for (const nomeAnimal of nomesAnimais) {
      try {
        const dadosAnimal = AbrigoAnimais.dados[nomeAnimal];

        const AnimalClasse = tiposDeAnimais[dadosAnimal.tipo];

        const animalInstancia = new AnimalClasse(
          nomeAnimal,
          dadosAnimal.brinquedos
        );

        animaisMap.set(nomeAnimal, animalInstancia);

        animalInstancia.checarCompatibilidade(dictPessoa1, 1);
        animalInstancia.checarCompatibilidade(dictPessoa2, 2);
        console.log(animalInstancia);
      } catch (e) {
        console.log(e);
        return { erro: "Animal inválido", lista: null };
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
      if (this.brinquedos[contadorAuxiliar] === brinquedo[0]) {
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
  checarCompatibilidade(arrayBrinquedo) {}
}

class Jabuti extends Animal {
  checarCompatibilidade(arrayBrinquedo) {}
}

const tiposDeAnimais = { cão: Cachorro, gato: Gato, jabuti: Jabuti };

export { AbrigoAnimais as AbrigoAnimais };

new AbrigoAnimais().encontraPessoas(
  "BOLA,LASER",
  "BOLA,NOVELO,RATO,LASER",
  "Mimi,Fofo,Rex,Bola"
);
