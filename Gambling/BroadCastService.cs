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

    public class MyResult
    {
        public int Tube { get; set; }
        public int Result { get; set; }
    }

    public class BroadCastService : BackgroundService
    {
        //private PlayGame playGame = PlayGame.Waiting;

        private IHubContext<ChatHub> hub;
        public BroadCastService(IHubContext<ChatHub> _hub)
        {
            hub = _hub;
        }


        private const int second = 25;
        int i = second;
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                await Task.Delay(1000);
                await hub.Clients.All.SendAsync("ReceiveMessage", "countDown", i);

                if (i == 0)
                {
                    int rndTube = new Random().Next(0, 5);

                    int rndResult = new Random().Next(0, 5);

                    MyResult myResult = new MyResult() { Tube = rndTube, Result = rndResult };

                    await hub.Clients.All.SendAsync("ReceiveMessage", "startGame", myResult);

                    await Task.Delay(TimeSpan.FromSeconds(12));

                    //await hub.Clients.All.SendAsync("ReceiveMessage", "startSubGame", "2");

                    //await Task.Delay(TimeSpan.FromSeconds(15));

                    await hub.Clients.All.SendAsync("ReceiveMessage", "newGame", "1");


                    i = second;
                }
                i--;
            }
        }
    }
}
