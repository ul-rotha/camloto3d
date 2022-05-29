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
        private PlayGame playGame = PlayGame.Waiting;

        private IHubContext<ChatHub> hub;
        public BroadCastService(IHubContext<ChatHub> _hub)
        {
            hub = _hub;
        }
        const int second = 5;
        int i = second;
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            await Task.Delay(5000);
            while (!stoppingToken.IsCancellationRequested)
            {   
                await Task.Delay(1000);
                
                if (playGame  == PlayGame.StartGame)
                {
                    //call start game
                    await hub.Clients.All.SendAsync("ReceiveMessage", "startGame", "");
                    await Task.Delay(TimeSpan.FromSeconds(5));


                    //call random main play
                    await hub.Clients.All.SendAsync("ReceiveMessage", "mainResult", "2");

                    await Task.Delay(TimeSpan.FromSeconds(1));

                    //call random second play
                    await hub.Clients.All.SendAsync("ReceiveMessage", "subPlay", "");

                    await Task.Delay(TimeSpan.FromSeconds(5));

                    await hub.Clients.All.SendAsync("ReceiveMessage", "subResult", "2");

                    await Task.Delay(TimeSpan.FromSeconds(5));

                    playGame = PlayGame.Waiting;
                    i = second + 1;

                }
                else if(playGame == PlayGame.Waiting)
                {

                    if (i == 0)
                    {
                        await hub.Clients.All.SendAsync("ReceiveMessage", "countdown", i);
                        playGame = PlayGame.StartGame;
                    }
                    else
                    {
                        await hub.Clients.All.SendAsync("ReceiveMessage", "countdown", i);
                    }
                }
                i--;
            }
        }
    }
}
