using Microsoft.AspNetCore.SignalR;

namespace Gambling
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string user1, string message)
        {

            await Clients.All.SendAsync("ReceiveMessage", user1, message);
        }
    }
}