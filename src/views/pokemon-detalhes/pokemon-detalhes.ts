import { Pokemon } from '../../models/pokemon';
import { PokemonService } from '../../services/pokemon.service';
import './pokemon-detalhes.css';

class PokemonDetalhes{

        formPrincipal: HTMLFormElement;
        txtPesquisa: HTMLInputElement;
        btnLimpar: HTMLButtonElement;

        pnlConteudo: HTMLDivElement;
        pokemonService: PokemonService;

        constructor() {
            this.pokemonService = new PokemonService();

            const url = new URLSearchParams(window.location.search);
            const nome = url.get('nome') as string;

            console.log(nome);
            this.pesquisarPokemonPorNome(nome);

            this.registrarElementos();
            this.registrarEventos();
          
        }

 


        registrarElementos():void{
            this.formPrincipal = document.getElementById('formPrincipal') as HTMLFormElement;
            this.txtPesquisa = document.getElementById('txtPesquisa') as HTMLInputElement;
            this.btnLimpar = document.getElementById('btnLimpar') as HTMLButtonElement;
            this.pnlConteudo = document.getElementById('pnlConteudo') as HTMLDivElement;
        }

        registrarEventos(): void{
            this.formPrincipal.addEventListener('submit', (e) => this.buscar(e));
            this.btnLimpar.addEventListener('click', () => this.Reiniciar());
        }

        buscar(sender: Event):void{
            sender.preventDefault();

            this.limparCard();

            const nome = this.txtPesquisa.value;

            this.pesquisarPokemonPorNome(nome);
        }

        limparCard(){
            this.pnlConteudo.querySelector('.card-pokemon')
            ?.remove();
        }
        Reiniciar(){
            this.redirecionarUsuario();
        }

        private redirecionarUsuario(): any {
            window.location.href = '/';
        }

        private pesquisarPokemonPorNome(nome: string) : void{
            this.pokemonService.selecionarPokemonPorNome(nome)
            .then(poke => this.gerarCard(poke))
            .catch((error: Error) =>this.exibirNotificacao(error));
        }

        

        private gerarCard(pokemon: Pokemon):void{
            const lblId = document.createElement("p");
            const lblNome = document.createElement("p");
            const imgSprite = document.createElement("img");
            const imgSpriteShiny = document.createElement("img");

            const lblTipoDePokemonNormal = document.createElement("p");
            const lblTipoDePokemonShiny = document.createElement("p");
            let lblMovimentos = document.createElement("p");
            

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
            pnlPokemon.appendChild(lblMovimentos);   

            this.pnlConteudo.appendChild(pnlPokemon);
        }

        private exibirNotificacao(error: Error): void{
            const notificacao = document.createElement('div');

            notificacao.textContent = error.message;
            notificacao.classList.add('notificacao');

            notificacao.addEventListener('click', (sender: Event) =>{(sender.target as HTMLElement).remove()})

           

            setTimeout(() => {
                notificacao.remove();
            }, 3000);

            // setInterval(() => {
            //     document.body.appendChild(notificacao);
            // }, 1000);
        }
}
window.addEventListener('load', () => new PokemonDetalhes());