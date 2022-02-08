using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Beers
{
    public class BeerModelAddRequest
    {
        [Required]
        [StringLength(25, MinimumLength = 1)]
        public string Name { get; set; }
    }
}
