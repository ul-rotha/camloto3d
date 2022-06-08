using Gambling.Hubs;
using Microsoft.AspNetCore.SignalR;

namespace Gambling
{
    enum PlayGame
    {
        StartGame,
        EndGame,
        Waiting
    }

    public class BroadCastService : BackgroundService
    {
        //private PlayGame playGame = PlayGame.Waiting;

        private IHubContext<ChatHub> hub;
        public BroadCastService(IHubContext<ChatHub> _hub)
        {
            hub = _hub;
        }


        private const int second = 300;
        int i = second;
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                await Task.Delay(1000);
                await hub.Clients.All.SendAsync("ReceiveMessage", "countDown", i);

                if (i == 0)
                {
                    int rnd = new Random().Next(0,3);
                    
                    await hub.Clients.All.SendAsync("ReceiveMessage", "startGame", rnd);

                    await Task.Delay(TimeSpan.FromSeconds(20));

                    await hub.Clients.All.SendAsync("ReceiveMessage", "startSubGame", "2");

                    await Task.Delay(TimeSpan.FromSeconds(15));

                    await hub.Clients.All.SendAsync("ReceiveMessage", "newGame", "1");


                    i = second;
                }
                i--;
            }
        }
    }
}
