import { Component, OnInit } from '@angular/core';
import { HubConnectionBuilder, HubConnection } from '@aspnet/signalr';

@Component({
  selector: 'app-counter-component',
  templateUrl: './counter.component.html'
})
export class CounterComponent implements OnInit {
  public currentCount = 0;
  public connection: HubConnection;

  constructor(){  //npm i @aspnet/signalr --save
    const builder = new HubConnectionBuilder();
    this.connection = builder.withUrl('http://localhost:5000/counter').build();
  }

  ngOnInit(){
    this.connection.start()
    .then(() => {
      this.connection.on('broadcastCounter', (val) => {  //метод connection.on РЕГЕСТРИРУЕТ обработчик, который будет вызываться при вызове Hub (серверного) метода с указанным именем метода.
                                                    //  @param methodName - имя Hub метода
        this.currentCount = val;                    // @param newMethod - метод обработчик, который будет вызываться при вызове Hub метода
        });                                        //val - те данные, которые хаб (сервере) отправляет клиенту, 
                                                      
        this.connection.invoke("broadcastCounter");   // broadcastCounter - метод на сервере который отдает данные val
    });

  }

    //Для отправки данных хабу (на сервер) вызывается метод connection.invoke('Send', message),
    // первый параметр которого представляет метод хаба (сервера), обрабатывающий данный запрос,
    // а второй параметр - данные, отправляемые на сервер.
  public incrementCounter() {
    this.connection.invoke('IncCounter');
  }
}
