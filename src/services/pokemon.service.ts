import { Pokemon } from "../models/pokemon";

export class PokemonService{

    selecionarPokemonPorNome(nome:string): Promise<Pokemon>{
         const url = `https://pokeapi.co/api/v2/pokemon/${nome}`;

         return fetch(url)
         .then((res: Response): Promise<any> => this.processarResposta(res))
         .then((obj: any): Pokemon => this.mapearPokemon(obj))
    }

    selecionarPokemons(): Promise<Pokemon[]>{
        const url = `https://pokeapi.co/api/v2/pokemon/`;

        return fetch(url)
        .then((res: Response): Promise<any> => this.processarResposta(res))
        .then((obj: any): Promise<Pokemon[]> => this.mapearListaPokemon(obj.results));
    }

    private processarResposta(res: Response): Promise<any>{
        if(res.ok)
            return res.json();

        throw new Error('Pokemon nao encontrado');
        
    }

    private mapearPokemon(obj: any): Pokemon{

       
        return {
            id: obj.id,
            nome:obj.name,
            spriteUrl: obj.sprites.front_default,
            spriteUrlShiny: obj.sprites.front_shiny,
           
        };
    }

    private mapearListaPokemon(objs: any[]):Promise<Pokemon[]>{
        const listaDePokemon = objs.map(obj =>{
           return this.selecionarPokemonPorNome(obj.name)
        });

        return Promise.all(listaDePokemon);
    }
}