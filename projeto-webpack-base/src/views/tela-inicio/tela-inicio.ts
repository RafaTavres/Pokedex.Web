import { Pokemon } from '../../models/pokemon';
import { PokemonService } from '../../services/pokemon-service';
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
        }


        registrarElementos():void{
            this.formPrincipal = document.getElementById('formPrincipal') as HTMLFormElement;
            this.txtPesquisa = document.getElementById('txtPesquisa') as HTMLInputElement;
            this.btnLimpar = document.getElementById('btnLimpar') as HTMLButtonElement;
            this.pnlConteudo = document.getElementById('pnlConteudo') as HTMLDivElement;
        }

        registrarEventos(): void{
            this.formPrincipal.addEventListener('submit', (e) => this.buscar(e));
            this.btnLimpar.addEventListener('click', () => this.limparCard());
        }

        buscar(sender: Event):void{
            sender.preventDefault();

            this.limparCard();

            const nome = this.txtPesquisa.value;

            this.pesquisarPokemonPorNome(nome);
        }

        limparCard(){
            this.pnlConteudo.querySelector(".card-pokemon")?.remove();
        }


        private pesquisarPokemonPorNome(nome: string) : void{
            this.pokemonService.selecionarPokemonPorNome(nome)
            .then(poke => this.gerarCard(poke))
            .catch(err => console.log('Pokemon nao encontrado', err));
        }

        private gerarCard(pokemon: Pokemon):void{
            const lblId = document.createElement("p");
            const lblNome = document.createElement("p");
            const imgSprite = document.createElement("img");
            const imgSpriteShiny = document.createElement("img");

            const lblTipoDePokemonNormal = document.createElement("p");
            const lblTipoDePokemonShiny = document.createElement("p");

            lblId.textContent = pokemon.id.toString();
            lblNome.textContent = pokemon.nome.toUpperCase();
            imgSprite.src = pokemon.spriteUrl;
            imgSpriteShiny.src = pokemon.spriteUrlShiny;
            lblTipoDePokemonNormal.textContent = 'Normal';
            lblTipoDePokemonShiny.textContent = 'Shiny';

            const pnlPokemon = document.createElement("div");
            pnlPokemon.classList.add('card-pokemon');

            pnlPokemon.appendChild(lblId);
            pnlPokemon.appendChild(lblNome);
            pnlPokemon.appendChild(lblTipoDePokemonNormal);
            pnlPokemon.appendChild(imgSprite);
            pnlPokemon.appendChild(lblTipoDePokemonShiny);
            pnlPokemon.appendChild(imgSpriteShiny);

            this.pnlConteudo.appendChild(pnlPokemon);
        }

}
window.addEventListener('load', () => new TelaInicio());