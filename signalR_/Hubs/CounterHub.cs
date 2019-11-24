using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace signalR_.Hubs
{
    public static class Counter
    {
        public static int value { get; set; }
    }

    public class CounterHub : Hub
    {
       
        public async Task BroadcastCounter()
        {
            await Clients.All.SendAsync("broadcastCounter", Counter.value);
        }

        public async Task IncCounter()
        {
            Counter.value ++; 
            await BroadcastCounter();
        }

    }


}
