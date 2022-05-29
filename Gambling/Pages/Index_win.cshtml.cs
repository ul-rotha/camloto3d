using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Gambling.Pages
{
    public class Index_winModel : PageModel
    {
        private readonly ILogger<IndexModel> _logger;

        public Index_winModel(ILogger<IndexModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {

        }
    }
}