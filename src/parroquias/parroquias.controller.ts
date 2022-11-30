import { Controller, Get, Res, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const provincias = require('../../data/provincias.json');

@ApiTags('Parroquias')
@Controller('parroquias')
export class ParroquiasController {
  parroquiasAmbato = [
    'Atocha - Ficoa',
    'Celiano Monge',
    'Huachi Chico',
    'Huachi Loreto',
    'La Matriz',
    'La Merced',
    'La Península',
    'Pishilata',
    'San Francisco',
    'Ambatillo',
    'Atahualpa',
    'Augusto Martinez',
    'Constantino Fernández',
    'Cunchibamba',
    'Huachi Grande',
    'Izamba',
    'Juan B. Vela',
    'Montalvo',
    'Pasa',
    'Picaihua',
    'Pilahuin',
    'Quisapincha',
    'San Bartolomé de Pinllo',
    'San Fernando',
    'Santa Rosa',
    'Totoras',
    'Unamuncho',
  ];

  parroquiasBanios = [
    'BAÑOS DE AGUA SANTA',
    'LLIGUA',
    'RÍO NEGRO',
    'RÍO VERDE',
    'ULBA',
  ];

  parroquiasCevallos = ['CEVALLOS'];

  parroquiasMocha = ['MOCHA', 'PINGUILÍ'];

  parroquiasPatate = [
    'PATATE',
    'EL TRIUNFO',
    'LOS ANDES (CAB. EN POATUG)',
    'SUCRE (CAB. EN SUCRE-PATATE URCU)',
  ];

  parroquiasQuero = [
    'QUERO',
    'RUMIPAMBA',
    'YANAYACU - MOCHAPATA (CAB. EN YANAYACU)',
  ];

  parroquiasPelileo = [
    'PELILEO GRANDE',
    'PELILEO',
    'BENÍTEZ (PACHANLICA)',
    'BOLÍVAR',
    'COTALÓ',
    'CHIQUICHA (CAB. EN CHIQUICHA GRANDE)',
    'EL ROSARIO (RUMICHACA)',
    'GARCÍA MORENO (CHUMAQUI)',
    'GUAMBALÓ (HUAMBALÓ)',
    'SALASACA',
  ];

  parroquiasPillaro = [
    'CIUDAD NUEVA',
    'PÍLLARO',
    'PÍLLARO',
    'BAQUERIZO MORENO',
    'EMILIO MARÍA TERÁN (RUMIPAMBA)',
    'MARCOS ESPINEL (CHACATA)',
    'PRESIDENTE URBINA (CHAGRAPAMBA -PATZUCUL)',
    'SAN ANDRÉS',
    'SAN JOSÉ DE POALÓ',
    'SAN MIGUELITO',
  ];

  parroquiasTisaleo = ['TISALEO', 'QUINCHICOTO'];
  @Get()
  getParroquias(@Res() res: Response) {
    return res.json(this.parroquiasAmbato);
  }

  @Get(':provincia')
  getParroquiasByProvincia(
    @Res() res: Response,
    @Param('provincia') provincia: string,
  ) {
    console.log(provincia);
    switch (provincia) {
      case 'Ambato':
        return res.json({ parroquias: this.parroquiasAmbato });
      case 'Baños':
        return res.json({ parroquias: this.parroquiasBanios });
      case 'Quero':
        return res.json({ parroquias: this.parroquiasQuero });
      case 'Pelileo':
        return res.json({ parroquias: this.parroquiasPelileo });
      case 'Patate':
        return res.json({ parroquias: this.parroquiasPatate });
      case 'Píllaro':
        return res.json({ parroquias: this.parroquiasPillaro });
      case 'Mocha':
        return res.json({ parroquias: this.parroquiasMocha });
      case 'Tisaleo':
        return res.json({ parroquias: this.parroquiasTisaleo });
      case 'Cevallos':
        return res.json({ parroquias: this.parroquiasCevallos });
      default:
        return res.json([]);
    }
  }
}
