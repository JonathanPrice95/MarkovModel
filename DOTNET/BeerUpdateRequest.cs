using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Beers
{
    public class BeerUpdateRequest
    {   
        [Required]
        [Range(1, Int32.MaxValue)]
        public int Id { get; set; }

        [Required]
        [StringLength(25, MinimumLength = 1)]
        public string Name { get; set; }

        [Required]
        [Range(0, Int32.MaxValue)]
        public int QuantityStart { get; set; }

        [Required]
        [Range(0, 1)]
        public float ProbabilityA { get; set; }

        [Required]
        [Range(0, 1)]
        public float ProbabilityB { get; set; }

        [Required]
        [Range(0, 1)]
        public float ProbabilityC { get; set; }

        [Required]
        [Range(0, 1)]
        public float ProbabilityD { get; set; }

        [Required]
        [Range(0, 1)]
        public float ProbabilityE { get; set; }

        [Required]
        [Range(0, 1)]
        public float ProbabilityF { get; set; }

        [Required]
        [Range(0, 1)]
        public float ProbabilityG { get; set; }

        [Required]
        [Range(0, 1)]
        public float ProbabilityH { get; set; }

        [Required]
        [Range(0, 1)]
        public float ProbabilityI { get; set; }

        [Required]
        [Range(-Int32.MaxValue, Int32.MaxValue)]
        public int Growth { get; set; }

        [Range(0, Int32.MaxValue)]
        public int ModifiedBy { get; set; }
    }
}
