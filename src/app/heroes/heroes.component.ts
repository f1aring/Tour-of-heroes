import {Component} from '@angular/core';
import {Hero} from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  
  selector: '<app-heroes>',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],

})

export class HeroesComponent {
  constructor(private heroService: HeroService, private messageService: MessageService)
  {}
  heroes: Hero[] = [];
  selectedHero?: Hero;

  ngOnInit(): void{
    this.getHeroes();
  }
  getHeroes(): void{
    this.heroService.getHeroes()
      .subscribe(hero => this.heroes = hero)
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }
  add(name: string): void{
    name = name.trim();
    if(!name) {return;}
    this.heroService.addHero({name} as Hero)
    .subscribe(hero=>{
      this.heroes.push(hero);
    })
  }
  delete(hero: Hero): void{
    this.heroes = this.heroes.filter(h=> h! == hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
}