using System;
using System.ComponentModel.DataAnnotations;

namespace PokerStats.Models
{
    public class PokerStatsModel
    {
        public long Id { get; set; } 

        [Required]
        [MaxLength(50)] 
        public string Game { get; set; }

        [Required]
        [Range(0, 9999999999.99)] 
        public decimal MoneyIn { get; set; }

        [Required]
        [Range(0, 9999999999.99)]
        public decimal MoneyOut { get; set; }

        [Required]
        [Range(0, 999.99)]
        public decimal Duration { get; set; }

        [Required]
        public DateTime DatePlayed { get; set; }
    }
}
