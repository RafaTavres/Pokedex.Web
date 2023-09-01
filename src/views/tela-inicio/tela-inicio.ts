import { Pokemon } from '../../models/pokemon';
import { PokemonService } from '../../services/pokemon.service';
import './tela-inicio.css';

class TelaInicio{

        formPrincipal: HTMLFormElement;
        txtPesquisa: HTMLInputElement;
        btnLimpar: HTMLButtonElement;

        pnlConteudo: HTMLDivElement;
        pokemonService: PokemonService;

        constructor() {
            this.registrarElementos();
            this.registrarEventos();
            this.pokemonService = new PokemonService();

            this.pokemonService.selecionarPokemons()
            .then(pokemons => this.gerarGridPokemons(pokemons));
        }


        registrarElementos():void{
            this.formPrincipal = document.getElementById('formPrincipal') as HTMLFormElement;
            this.txtPesquisa = document.getElementById('txtPesquisa') as HTMLInputElement;
           this.pnlConteudo = document.getElementById('pnlConteudo') as HTMLDivElement;
        }

        registrarEventos(): void{
            this.formPrincipal.addEventListener('submit', (e) => this.buscar(e));
        }

        buscar(sender: Event):void{
            sender.preventDefault();

            const nome = this.txtPesquisa.value;

            this.pesquisarPokemonPorNome(nome);
        }


        private pesquisarPokemonPorNome(nome: string) : void{
            this.pokemonService.selecionarPokemonPorNome(nome)
            .then(poke => this.redirecionarUsuario(poke.nome))
            .catch((error: Error) =>this.exibirNotificacao(error));
        }

        private redirecionarUsuario(nome: string): any {
            window.location.href = `pokemon-detalhes.html?nome=${nome}`;
        }

        private exibirNotificacao(error: Error): void{
            const notificacao = document.createElement('div');

            notificacao.textContent = error.message;
            notificacao.classList.add('notificacao');

            notificacao.addEventListener('click', (sender: Event) =>{(sender.target as HTMLElement).remove()})

           
            document.body.appendChild(notificacao);
            
            setTimeout(() => {
                notificacao.remove();
            }, 3000);

            // setInterval(() => {
            //     document.body.appendChild(notificacao);
            // }, 1000);
        }

        private gerarGridPokemons(pokemons: Pokemon[]): any {
           const pnlGrid = document.createElement('div');

           pnlGrid.classList.add('grid-pokemons');

           for(let pokemon of pokemons){
                const card = this.obterCard(pokemon);
                pnlGrid.appendChild(card);
           }
           this.pnlConteudo.appendChild(pnlGrid);
        }

        private obterCard(pokemon: Pokemon) {
            const id = document.createElement("p");
            const imagem = document.createElement("img");
            const nomePokemon = document.createElement("p");

            const lblTipoDePokemonNormal = document.createElement("p");

            id.textContent = pokemon.id.toString();
            nomePokemon.textContent = pokemon.nome.toUpperCase();
            imagem.src = pokemon.spriteUrl;
            lblTipoDePokemonNormal.textContent = 'Normal';


            const cardPokemon = document.createElement('div');
            cardPokemon.classList.add('card-pokemon');

            cardPokemon.addEventListener('click',() => {window.location.href = `pokemon-detalhes.html?nome=${pokemon.nome}`})

            cardPokemon.appendChild(id);
            cardPokemon.appendChild(imagem);
            cardPokemon.appendChild(lblTipoDePokemonNormal);
            cardPokemon.appendChild(nomePokemon);

            return cardPokemon;
        }

}
window.addEventListener('load', () => new TelaInicio());