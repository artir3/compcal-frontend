import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/models/models';


@Component({
  selector: 'app-legal-basis',
  templateUrl: './legal-basis.component.html',
  styleUrls: ['./legal-basis.component.css']
})
export class LegalBasisComponent implements OnInit {
  cards: Card[] = [
    {
      site: "Prawo.sejm.gow", title: "Rozporządzenie ministra finansów z dnia 26 sierpnia 2003 r. w sprawie prowadzenia podatkowej księgi przychodów i rozchodów", url: "http://prawo.sejm.gov.pl/isap.nsf/download.xsp/WDU20031521475/O/D20031475.pdf"
    },
    {
      site: "Biznes.gov.pl", title: "Obowiązki ewidencyjne podmiotów rozliczających się na zasadach ogólnych w formie podatkowej księgi przychodów i rozchodów.",
      url: "https://www.biznes.gov.pl/pl/publikacje/2398-obowiazki-ewidencyjne-podmiotow-rozliczajacych-sie-na-zasadach-ogolnych-w-formie-podatkowej-ksiazki-przychodow-i-rozchodow"
    },
    {
      site: "Biznes.gov.pl", title: "Jak prowadzić podatkową księgę przychodów i rozchodów (PKPiR)?",
      url: "https://www.biznes.gov.pl/pl/firma/podatki-i-ksiegowosc/chce-prowadzic-ksiegowosc/ksiegowosc-w-firmie-informacje-podstawowe/jak-prowadzic-podatkowa-ksiege-przychodow-i-rozchodow-pkpir"
    },

  ]
  constructor() { }

  ngOnInit() {
  }


}
