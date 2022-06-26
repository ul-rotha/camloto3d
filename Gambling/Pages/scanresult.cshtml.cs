using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace SignalR.Pages
{
    public class ScanResultModel : PageModel
    {
        private readonly ILogger<ScanResultModel> _logger;

        public ScanResultModel(ILogger<ScanResultModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {

        }
    }
}