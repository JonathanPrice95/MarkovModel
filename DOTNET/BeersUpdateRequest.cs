﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Beers
{
    public class BeersUpdateRequest
    {
        [Required]
        public List<BeerUpdateRequest> Beers { get; set; }
    }
}