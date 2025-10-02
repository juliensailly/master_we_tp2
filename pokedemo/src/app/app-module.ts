import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { MyComponent } from './my-component/my-component';
import { FormsModule } from '@angular/forms';
import { FilterPokemonPipePipe } from './filter-pokemon--pipe-pipe';
import { PokeAPI } from './poke-api';
import { PokemonDetails } from './pokemon-details/pokemon-details';

@NgModule({
  declarations: [
    App,
    MyComponent,
    FilterPokemonPipePipe,
    PokemonDetails
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    PokeAPI
  ],
  bootstrap: [App]
})
export class AppModule { }
