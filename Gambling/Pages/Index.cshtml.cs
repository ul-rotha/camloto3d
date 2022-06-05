using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Gambling.Pages
{
    public class Index : PageModel
    {
        private readonly ILogger<IndexModel> _logger;

        public Index(ILogger<IndexModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {

        }
    }
}