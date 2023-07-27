using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BuildATrain.Models.Game
{
    public class WalletModel
    {
        public int Id { get; set; }

        [NotMapped]
        public string Username { get; set; }

        [NotMapped]
        public string? Email { get; set; }

        public decimal CurrentWallet { get; set; }

    }
}
