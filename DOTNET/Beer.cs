using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain
{
    public class Beer
    {
        public int Id { get; set; }
        public int ModelId { get; set; }
        public string Name { get; set; }
        public int QuantityStart { get; set; }
        public float ProbabilityA { get; set; }
        public float ProbabilityB { get; set; }
        public float ProbabilityC { get; set; }
        public float ProbabilityD { get; set; }
        public float ProbabilityE { get; set; }
        public float ProbabilityF { get; set; }
        public float ProbabilityG { get; set; }
        public float ProbabilityH { get; set; }
        public float ProbabilityI { get; set; }
        public int Growth { get; set; }
        public int CreatedBy { get; set; }
        public int ModifiedBy { get; set; }
        public DateTime DateAdded { get; set; }
        public DateTime DateModified { get; set; }
    }
}
