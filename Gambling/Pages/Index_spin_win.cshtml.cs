using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Gambling.Pages
{
    public class Index_spin_win : PageModel
    {
        private readonly ILogger<IndexModel> _logger;

        public Index_spin_win(ILogger<IndexModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {

        }
    }
}