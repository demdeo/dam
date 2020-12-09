//correr antes npm install --save highcharts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Highcharts from 'highcharts';
import * as moment from 'moment';
import { Medicion } from '../model/Medicion';
import { Riego } from '../model/Riego';
import { MedicionService } from '../services/medicion.service';
import { RiegoService } from '../services/riego.service';

declare var require: any;
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);

@Component({
  selector: 'app-dispositivo',
  templateUrl: './dispositivo.page.html',
  styleUrls: ['./dispositivo.page.scss'],
})
export class DispositivoPage implements OnInit {

  private dispositivo:number;
  private estadoElectrovalvula:boolean=false;
  private valorObtenido:number=0;
  public myChart;
  private chartOptions;

  constructor(private router:ActivatedRoute, private medicionServ: MedicionService, private riegoServ: RiegoService) { 
   
  }

  ngOnInit() {
    
  }

  ionViewDidEnter() {
    //let idDispositivo = this.router.snapshot.paramMap.get('id');
    //this.dispositivo = parseInt(idDispositivo);
    this.dispositivo = parseInt(this.router.snapshot.paramMap.get('id'));
    this.mostrarUltimoValor();
    this.generarChart();
  }
/*
  constructor(public dispositivoServ:DispositivoService) {
    this.dispositivoServ.getDispositivos().then((listado:Dispositivo[])=>{
      this.listadoDisp=listado;
    });
  }*/

  async mostrarUltimoValor() {
    console.log('Estoy en setNewValue')
    await this.medicionServ.getUltimaMedicion(this.dispositivo).then((ultMedicion:Medicion) => {
      this.valorObtenido = Number(ultMedicion.valor);}
    )
    this.myChart.update({series: [{
      name: 'kPA',
      data: [this.valorObtenido],
      tooltip: {
          valueSuffix: ' kPA'
      }
    }]});
    console.log(this.valorObtenido)
  }

  generarChart() {
    this.chartOptions={
      chart: {
          type: 'gauge',
          plotBackgroundColor: null,
          plotBackgroundImage: null,
          plotBorderWidth: 0,
          plotShadow: false
        }
        ,title: {
          text: 'Sensor N° ' + this.dispositivo
        }

        ,credits:{enabled:false}
        
           
        ,pane: {
            startAngle: -150,
            endAngle: 150
        } 
        // the value axis
      ,yAxis: {
        min: 0,
        max: 100,
  
        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#666',
  
        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
            step: 2,
            rotation: 'auto'
        },
        title: {
            text: 'kPA'
        },
        plotBands: [{
            from: 0,
            to: 10,
            color: '#55BF3B' // green
        }, {
            from: 10,
            to: 30,
            color: '#DDDF0D' // yellow
        }, {
            from: 30,
            to: 100,
            color: '#DF5353' // red
        }]
    }
    ,
  
    series: [{
        name: 'kPA',
        data: [this.valorObtenido],
        tooltip: {
            valueSuffix: ' kPA'
        }
    }]

    };
    this.myChart = Highcharts.chart('highcharts', this.chartOptions );
  }

  cambiarEstadoElectrovalvula(){
    this.estadoElectrovalvula = !this.estadoElectrovalvula;
    console.log('Estado Electrovalvula: ' + this.estadoElectrovalvula);
    var logRiego: Riego = new Riego(1,moment().format("YYYY-MM-DD HH:mm:ss"),1,this.dispositivo);
    this.riegoServ.postLog(logRiego);
  }
}